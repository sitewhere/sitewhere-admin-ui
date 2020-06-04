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
      <v-tab key="mapping">Mapping</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="mapping">
        <mapping-fields :destinations="destinations" :deviceTypes="deviceTypes" ref="mapping" />
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
  IDeviceTypeMapping
} from "sitewhere-configuration-model";
import { IDeviceType } from "sitewhere-rest-api";

import MappingFields from "./MappingFields.vue";

@Component({
  components: {
    VTab,
    VTabItem,
    DialogComponent,
    BaseDialog,
    MappingFields
  }
})
export default class SettingsDialog extends DialogComponent<
  IDeviceTypeMapping
> {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Prop() readonly deviceTypes!: IDeviceType[];
  @Prop() readonly title!: string;
  @Prop() readonly createLabel!: string;
  @Ref() readonly dialog!: BaseDialog;
  @Ref() readonly mapping!: MappingFields;

  /** Generate payload from UI */
  generatePayload() {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const payload: any = {};
    Object.assign(payload, this.mapping.save());

    return payload;
  }

  /** Reset dialog fields */
  reset(): void {
    if (this.mapping) {
      this.mapping.reset();
    }
  }

  /** Load dialog from a given configuration */
  load(config: IDeviceTypeMapping) {
    if (this.mapping) {
      this.mapping.load(config);
    }
  }

  /** Called after create button is clicked */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
  onCreateClicked(e: any) {
    if (!this.mapping.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
    this.closeDialog();
  }
}
</script>
