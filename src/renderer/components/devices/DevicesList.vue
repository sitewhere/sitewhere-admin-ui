<template>
  <list-page
    :icon="icon"
    title="Manage Devices"
    loadingMessage="Loading devices ..."
    :loaded="loaded"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="(device) in matches" :key="device.token">
        <device-list-entry
          :device="device"
          @assignDevice="onAssignDevice"
          @deviceOpened="onOpenDevice"
        ></device-list-entry>
      </v-flex>
    </list-layout>
    <template slot="filters">
      <device-list-filter-bar ref="filters" @filter="onFilterUpdated"></device-list-filter-bar>
    </template>
    <template slot="dialogs">
      <device-create-dialog ref="add" @deviceAdded="onDeviceAdded"/>
      <assignment-create-dialog ref="assign" @assignmentCreated="onAssignmentCreated"></assignment-create-dialog>
      <batch-command-create-dialog ref="batch" :filter="filter"></batch-command-create-dialog>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Device" @action="onAddDevice"></navigation-action-button>
      <navigation-action-button
        v-if="filter.deviceType"
        icon="bolt"
        tooltip="Execute Batch Command"
        @action="onBatchCommandInvocation"
      ></navigation-action-button>
      <navigation-action-button
        icon="filter"
        tooltip="Filter Device List"
        @action="onShowFilterCriteria"
      ></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import ListPage from "../common/ListPage.vue";
import ListLayout from "../common/ListLayout.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import DeviceListEntry from "./DeviceListEntry.vue";
import DeviceListFilterBar from "./DeviceListFilterBar.vue";
import DeviceCreateDialog from "./DeviceCreateDialog.vue";
import AssignmentCreateDialog from "../assignments/AssignmentCreateDialog.vue";
import BatchCommandCreateDialog from "../batch/BatchCommandCreateDialog.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { NavigationIcon } from "../../libraries/constants";
import { IPageSizes } from "../../libraries/navigation-model";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDevices } from "../../rest/sitewhere-devices-api";
import {
  IDevice,
  IDeviceSearchCriteria,
  IDeviceResponseFormat,
  IDeviceSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    NavigationActionButton,
    DeviceListEntry,
    DeviceListFilterBar,
    DeviceCreateDialog,
    AssignmentCreateDialog,
    BatchCommandCreateDialog
  }
})
export default class DevicesList extends ListComponent<
  IDevice,
  IDeviceSearchCriteria,
  IDeviceResponseFormat,
  IDeviceSearchResults
> {
  filter: {} = {};
  pageSizes: IPageSizes = [
    {
      text: "20",
      value: 20
    },
    {
      text: "50",
      value: 50
    },
    {
      text: "100",
      value: 100
    }
  ];

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceSearchCriteria {
    let criteria: IDeviceSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceResponseFormat {
    let format: IDeviceResponseFormat = {};
    format.includeDeviceType = true;
    format.includeAssignment = true;
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDeviceSearchCriteria,
    format: IDeviceResponseFormat
  ): AxiosPromise<IDeviceSearchResults> {
    return listDevices(store, criteria, format);
  }

  // Called to show filter criteria dialog.
  onShowFilterCriteria() {
    (this.$refs.filters as any).showFilterCriteriaDialog();
  }

  // Called when filter criteria are updated.
  onFilterUpdated(filter: any) {
    this.$data.filter = filter;
    this.refresh();
  }

  // Open device assignment dialog.
  onAssignDevice(device: IDevice) {
    // let assignDialog = this.$refs["assign"];
    // assignDialog.deviceToken = device.token;
    // assignDialog.onOpenDialog();
  }

  // Called after new assignment is created.
  onAssignmentCreated() {
    this.refresh();
  }

  // Called when a new device is added.
  onDeviceAdded() {
    this.refresh();
  }

  // Called to open detail page for device.
  onOpenDevice(device: IDevice) {
    routeTo(this, "/devices/" + device.token);
  }

  // Called to open dialog.
  onAddDevice() {
    (this.$refs.add as any).onOpenDialog();
  }

  // Called to invoke a batch command.
  onBatchCommandInvocation() {
    (this.$refs.batch as any).onOpenDialog();
  }
}
</script>

<style scoped>
</style>
