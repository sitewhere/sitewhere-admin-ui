<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Filter Device List"
    width="600"
    :loaded="loaded"
    :visible="dialogVisible"
    createLabel="Filter"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <dialog-header>Choose criteria for filtering which devices are shown</dialog-header>
    <template slot="tabs">
      <v-tab key="devicetype">Device Type</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="devicetype">
        <device-list-filter-device-type-fields ref="devicetype" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import DialogHeader from "../common/dialog/DialogHeader.vue";
import DeviceListFilterDeviceTypeFields from "./DeviceListFilterDeviceTypeFields.vue";

import { IDeviceSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DialogHeader,
    DeviceListFilterDeviceTypeFields
  }
})
export default class DeviceListFilterDialog extends DialogComponent<
  IDeviceSearchCriteria
> {
  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    devicetype: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(payload, this.$refs.devicetype.save());
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.devicetype) {
      this.$refs.devicetype.reset();
    }
    if (this.$refs.dialog) {
      this.$refs.dialog.setActiveTab(0);
    }
  }

  // Load dialog from a given payload.
  load(payload: IDeviceSearchCriteria) {
    this.reset();
    if (this.$refs.devicetype) {
      this.$refs.devicetype.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.devicetype.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
