<template>
  <sw-base-dialog
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
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <device-status-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="metadata">
        <sw-metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent, DialogSection } from "sitewhere-ide-components";

import DeviceStatusDetailFields from "./DeviceStatusDetailFields.vue";
import { IDeviceStatus } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceStatusDetailFields
  }
})
export default class DeviceStatusDialog extends DialogComponent<IDeviceStatus> {
  @Prop() readonly deviceTypeToken!: string;
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: DeviceStatusDetailFields;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceStatus;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {
      deviceTypeToken: this.deviceTypeToken
    };
    Object.assign(payload, this.details.save(), this.metadata.save());
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IDeviceStatus) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    var payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>

<style scoped>
</style>
