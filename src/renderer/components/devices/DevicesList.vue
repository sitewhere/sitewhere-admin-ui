<template>
  <sw-list-page
    :icon="icon"
    title="Manage Devices"
    loadingMessage="Loading devices ..."
    :loaded="loaded"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(device) in matches" :key="device.token">
        <device-list-entry :device="device" @assign="onAssignDevice" @open="onOpenDevice" />
      </v-flex>
    </sw-list-layout>
    <template slot="filters">
      <device-list-filter-bar ref="filters" :criteria="filter" @clear="onClearFilterCriteria" />
    </template>
    <template slot="noresults">
      <no-results-panel>
        <div>No devices have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{addIcon}}</v-icon>in the toolbar to add a device.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <device-create-dialog ref="add" @deviceAdded="onDeviceAdded" />
      <assignment-create-dialog ref="assign" :device="selected" @created="onAssignmentCreated" />
      <invocation-by-device-criteria-create-dialog :filter="filter" ref="batch" />
      <device-list-filter-dialog ref="filter" @payload="onFilterUpdated" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Device" @action="onAddDevice" />
      <device-command-button
        v-if="filter.deviceTypeToken"
        tooltip="Execute Batch Command"
        @action="onBatchCommandInvocation"
      />
      <filter-button tooltip="Filter Device List" @action="onShowFilterCriteria" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import {
  Component,
  ListComponent,
  IPageSizes,
  Refs
} from "sitewhere-ide-common";

import DeviceListEntry from "./DeviceListEntry.vue";
import DeviceListFilterBar from "./DeviceListFilterBar.vue";
import DeviceListFilterDialog from "./DeviceListFilterDialog.vue";
import DeviceCreateDialog from "./DeviceCreateDialog.vue";
import AssignmentCreateDialog from "../assignments/AssignmentCreateDialog.vue";
import InvocationByDeviceCriteriaCreateDialog from "../batch/InvocationByDeviceCriteriaCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import DeviceCommandButton from "../common/navbuttons/DeviceCommandButton.vue";
import FilterButton from "../common/navbuttons/FilterButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { NavigationIcon } from "../../libraries/constants";
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
    DeviceListEntry,
    DeviceListFilterBar,
    DeviceListFilterDialog,
    DeviceCreateDialog,
    AssignmentCreateDialog,
    InvocationByDeviceCriteriaCreateDialog,
    AddButton,
    DeviceCommandButton,
    FilterButton,
    NoResultsPanel
  }
})
export default class DevicesList extends ListComponent<
  IDevice,
  IDeviceSearchCriteria,
  IDeviceResponseFormat,
  IDeviceSearchResults
> {
  $refs!: Refs<{
    add: DeviceCreateDialog;
    assign: AssignmentCreateDialog;
    filter: DeviceListFilterDialog;
    batch: InvocationByDeviceCriteriaCreateDialog;
  }>;

  addIcon: string = NavigationIcon.Add;

  selected: IDevice | null = null;
  filter: IDeviceSearchCriteria = {};
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
    return this.filter;
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
    criteria: IDeviceSearchCriteria,
    format: IDeviceResponseFormat
  ): AxiosPromise<IDeviceSearchResults> {
    return listDevices(this.$store, criteria, format);
  }

  /** Called to show filter criteria dialog */
  onShowFilterCriteria() {
    this.$refs.filter.openDialog();
  }

  /** Clears the filter criteria */
  onClearFilterCriteria() {
    this.filter = {};
    this.$refs.filter.reset();
    this.refresh();
  }

  /** Called when filter criteria are updated */
  onFilterUpdated(filter: IDeviceSearchCriteria) {
    this.$refs.filter.closeDialog();
    this.filter = filter;
    this.refresh();
  }

  /** Open device assignment dialog */
  onAssignDevice(device: IDevice) {
    this.selected = device;
    this.$refs.assign.open();
  }

  /** Called after new assignment is created */
  onAssignmentCreated() {
    this.refresh();
  }

  /** Called when a new device is added */
  onDeviceAdded() {
    this.refresh();
  }

  /** Called to open detail page for device */
  onOpenDevice(device: IDevice) {
    routeTo(this, "/devices/" + device.token);
  }

  /** Called to open dialog */
  onAddDevice() {
    this.$refs.add.open();
  }

  /** Called to invoke a batch command */
  onBatchCommandInvocation() {
    this.$refs.batch.open();
  }
}
</script>
