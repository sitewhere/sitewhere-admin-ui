<template>
  <base-dialog
    ref="dialog"
    icon="fa-sitemap"
    :title="title"
    width="500"
    :loaded="true"
    :visible="dialogVisible"
    :createLabel="createLabel"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="manager">Settings</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="manager">
        <settings-fields :destinations="destinations" ref="settings" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";

import { DialogComponent, BaseDialog } from "sitewhere-ide-components";
import { VTab, VTabItem } from "vuetify/lib";

import {
  ICommandDestinationGenericConfiguration,
  IDeviceTypeMappingRouterConfiguration
} from "sitewhere-configuration-model";

import SettingsFields from "./SettingsFields.vue";

@Component({
  components: {
    VTab,
    VTabItem,
    DialogComponent,
    BaseDialog,
    SettingsFields
  }
})
export default class SettingsDialog extends DialogComponent<
  IDeviceTypeMappingRouterConfiguration
> {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Prop() readonly title!: string;
  @Prop() readonly createLabel!: string;
  @Ref() readonly dialog!: BaseDialog;
  @Ref() readonly settings!: SettingsFields;

  /** Generate payload from UI */
  generatePayload() {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const payload: any = {};
    Object.assign(payload, this.settings.save());

    return payload;
  }

  /** Reset dialog fields */
  reset(): void {
    if (this.settings) {
      this.settings.reset();
    }
  }

  /** Load dialog from a given configuration */
  load(config: IDeviceTypeMappingRouterConfiguration) {
    if (this.settings) {
      this.settings.load(config);
    }
  }

  /** Called after create button is clicked */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
  onCreateClicked(e: any) {
    if (!this.settings.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
    this.closeDialog();
  }
}
</script>
