<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading device ..."
    :loaded="loaded"
    :record="device"
  >
    <template slot="header">
      <device-detail-header :record="device" @deviceDeleted="onDeviceDeleted"></device-detail-header>
    </template>
    <template slot="tabs">
      <v-tab key="assignments" href="#assignments">Assignment History</v-tab>
    </template>
    <template slot="tab-items">
      <device-assignment-history tabkey="assignments" id="assignments" :deviceToken="token"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="edit" tooltip="Edit Device" @action="onEdit"></navigation-action-button>
      <navigation-action-button icon="times" tooltip="Delete Device" @action="onDelete"></navigation-action-button>
    </template>
    <template slot="dialogs">
      <device-update-dialog ref="edit" :token="token" @deviceUpdated="onDeviceUpdated"></device-update-dialog>
      <device-delete-dialog ref="delete" :token="token" @deviceDeleted="onDeviceDeleted"></device-delete-dialog>
    </template>
  </detail-page>
</template>

<script lang="ts">
import { DetailComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import DetailPage from "../common/DetailPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import DeviceDetailHeader from "./DeviceDetailHeader.vue";
import DeviceAssignmentHistory from "./DeviceAssignmentHistory.vue";
import DeviceUpdateDialog from "./DeviceUpdateDialog.vue";
import DeviceDeleteDialog from "./DeviceDeleteDialog.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection } from "../../libraries/navigation-model";
import { getDevice } from "../../rest/sitewhere-devices-api";
import { IDevice, IDeviceResponseFormat } from "sitewhere-rest-api";

export class DeviceDetailComponent extends DetailComponent<IDevice> {}

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    DeviceDetailHeader,
    DeviceAssignmentHistory,
    DeviceUpdateDialog,
    DeviceDeleteDialog
  }
})
export default class DeviceDetail extends Mixins(DeviceDetailComponent) {
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
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<IDevice> {
    let format: IDeviceResponseFormat = {
      includeDeviceType: true,
      includeAssignment: true
    };
    return getDevice(store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(device: IDevice) {
    var section: INavigationSection = {
      id: "devices",
      title: "Devices",
      icon: "microchip",
      route: "/admin/devices/" + device.token,
      longTitle: "Manage Device: " + device.token
    };
    this.$store.commit("currentSection", section);
  }

  // Open dialog to edit device.
  onEdit() {
    (this.$refs["edit"] as any).onOpenDialog();
  }

  // Called after update.
  onDeviceUpdated() {
    this.refresh();
  }

  // Open dialog to delete device.
  onDelete() {
    (this.$refs["delete"] as any).showDeleteDialog();
  }

  // Called after device is deleted.
  onDeviceDeleted() {
    routeTo(this, "/devices");
  }
}
</script>

<style scoped>
</style>
