<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading device ..."
    :loaded="loaded"
    :record="device"
  >
    <template slot="header">
      <device-detail-header :record="device" @deviceDeleted="onDeviceDeleted"/>
    </template>
    <template slot="tabs">
      <v-tab key="assignments">Assignment History</v-tab>
    </template>
    <template slot="tab-items">
      <device-assignment-history tabkey="assignments" :deviceToken="token"/>
    </template>
    <template slot="actions">
      <edit-button tooltip="Edit Device" @action="onEdit"/>
      <delete-button tooltip="Delete Device" @action="onDelete"/>
    </template>
    <template slot="dialogs">
      <device-update-dialog ref="edit" :token="token" @deviceUpdated="onDeviceUpdated"/>
      <device-delete-dialog ref="delete" :token="token" @deleted="onDeviceDeleted"/>
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import DeviceDetailHeader from "./DeviceDetailHeader.vue";
import DeviceAssignmentHistory from "./DeviceAssignmentHistory.vue";
import DeviceUpdateDialog from "./DeviceUpdateDialog.vue";
import DeviceDeleteDialog from "./DeviceDeleteDialog.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getDevice } from "../../rest/sitewhere-devices-api";
import { IDevice, IDeviceResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceDetailHeader,
    DeviceAssignmentHistory,
    DeviceUpdateDialog,
    DeviceDeleteDialog,
    EditButton,
    DeleteButton
  }
})
export default class DeviceDetail extends DetailComponent<IDevice> {
  // References.
  $refs!: Refs<{
    edit: DeviceUpdateDialog;
    delete: DeviceDeleteDialog;
  }>;

  get device(): IDevice | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  get title(): string {
    return this.device ? `Manage device ${this.device.token}` : "Manage device";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDevice> {
    let format: IDeviceResponseFormat = {
      includeDeviceType: true,
      includeAssignment: true
    };
    return getDevice(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(device: IDevice) {
    var section: INavigationSection = {
      id: "devices",
      title: "Devices",
      icon: NavigationIcon.Device,
      route: "/admin/devices/" + device.token,
      longTitle: "Manage Device: " + device.token
    };
    this.$store.commit("currentSection", section);
  }

  // Open dialog to edit device.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called after update.
  onDeviceUpdated() {
    this.refresh();
  }

  // Open dialog to delete device.
  onDelete() {
    if (this.token) {
      this.$refs.delete.open(this.token);
    }
  }

  // Called after device is deleted.
  onDeviceDeleted() {
    routeTo(this, "/devices");
  }
}
</script>

<style scoped>
</style>
