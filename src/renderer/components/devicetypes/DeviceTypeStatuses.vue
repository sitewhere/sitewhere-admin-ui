<template>
  <sw-list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device commands..."
    :results="results"
  >
    <sw-list-layout>
      <v-flex xs3 v-for="status in matches" :key="status.code">
        <div>
          <device-status-list-entry
            :deviceStatus="status"
            @edit="onEditStatus"
            @delete="onDeleteStatus"
          />
        </div>
      </v-flex>
    </sw-list-layout>
    <template slot="dialogs">
      <device-status-update-dialog ref="edit" @deviceStatusUpdated="refresh"/>
    </template>
  </sw-list-tab>
</template>

<script lang="ts">
import { Component, Prop, Refs, ListComponent } from "sitewhere-ide-common";

import NoResultsPanel from "../common/NoResultsPanel.vue";
import DeviceStatusListEntry from "../statuses/DeviceStatusListEntry.vue";
import DeviceStatusUpdateDialog from "../statuses/DeviceStatusUpdateDialog.vue";

import { AxiosPromise } from "axios";
import { listDeviceStatuses } from "../../rest/sitewhere-device-statuses-api";
import {
  IDeviceType,
  IDeviceStatus,
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    NoResultsPanel,
    DeviceStatusListEntry,
    DeviceStatusUpdateDialog
  }
})
export default class DeviceTypeStatuses extends ListComponent<
  IDeviceStatus,
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceType!: IDeviceType;

  // References.
  $refs!: Refs<{
    edit: DeviceStatusUpdateDialog;
  }>;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceStatusSearchCriteria {
    let criteria: IDeviceStatusSearchCriteria = {};
    criteria.deviceTypeToken = this.deviceType.token;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceStatusResponseFormat {
    let format: IDeviceStatusResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceStatusSearchCriteria,
    format: IDeviceStatusResponseFormat
  ): AxiosPromise<IDeviceStatusSearchResults> {
    return listDeviceStatuses(this.$store, criteria, format);
  }

  /** Open dialog to edit status */
  onEditStatus(status: IDeviceStatus) {
    this.$refs.edit.open(status.token);
  }

  /** Open dialog to delete status */
  onDeleteStatus(status: IDeviceStatus) {}
}
</script>

<style scoped>
</style>
