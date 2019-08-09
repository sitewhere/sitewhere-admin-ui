<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Tenant Engine Runtime State"
    width="600"
    :loaded="loaded"
    :visible="dialogVisible"
    :hideCreate="true"
    cancelLabel="Close"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="components">Components</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="components">
        <v-card flat>
          <v-card-text>
            <v-treeview
              ref="tree"
              selectable
              :items="treeData"
              item-children="childComponentStates"
              item-key="componentId"
              item-text="componentName"
              v-model="items"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Prop, DialogComponent } from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import ComponentStatusIcon from "./ComponentStatusIcon.vue";
import { ITenant, ITenantEngineState } from "sitewhere-rest-api";
import { ILifecycleComponentState } from "sitewhere-rest-api";

@Component({
  components: {
    ComponentStatusIcon
  }
})
export default class TenantEngineComponentsDialog extends DialogComponent<
  ITenant
> {
  @Prop() readonly tenantState!: ITenantEngineState;

  items: string[] = [];
  selected: ILifecycleComponentState | null = null;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Tenant;
  }

  /** Points to root of component state hierarchy */
  get treeData(): ILifecycleComponentState[] {
    return this.tenantState.childComponentStates;
  }

  get errorItemSelected() {
    let selected = this.$data.selected;
    if (selected && selected.status === "LifecycleError") {
      return true;
    }
    return false;
  }

  onCancelClicked() {
    this.$emit("closeClicked");
  }

  /** Handle tree node clicked */
  handleNodeClick(state: ILifecycleComponentState) {
    this.selected = state;
  }
}
</script>

<style scoped>
.component-tree {
  max-height: 400px;
  overflow-y: auto;
}
</style>
