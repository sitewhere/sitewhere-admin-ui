<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="details">Details</v-tab>
      <v-tab key="branding">Branding</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" eager>
        <device-group-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="branding" eager>
        <branding-panel ref="branding" />
      </v-tab-item>
      <v-tab-item key="metadata" eager>
        <metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  BaseDialog,
  DialogComponent,
  DialogSection,
  BrandingPanel,
  MetadataPanel
} from "sitewhere-ide-components";

import DeviceGroupDetailFields from "./DeviceGroupDetailFields.vue";
import { IDeviceGroup } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    DeviceGroupDetailFields,
    BrandingPanel,
    MetadataPanel
  }
})
export default class DeviceGroupDialog extends DialogComponent<IDeviceGroup> {
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: DeviceGroupDetailFields;
  @Ref() readonly branding!: BrandingPanel;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceGroup;
  }

  /** Generate payload from UI */
  generatePayload() {
    const payload: any = {};
    Object.assign(
      payload,
      this.details.save(),
      this.branding.save(),
      this.metadata.save()
    );
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.branding) {
      this.branding.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: IDeviceGroup) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.branding) {
      this.branding.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.branding.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    const payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>
