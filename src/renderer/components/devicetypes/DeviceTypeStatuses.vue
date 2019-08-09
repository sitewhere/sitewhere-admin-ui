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
      <device-status-update-dialog
        ref="edit"
        :deviceTypeToken="deviceTypeToken"
        @updated="refresh"
      />
      <device-status-delete-dialog
        ref="delete"
        :deviceTypeToken="deviceTypeToken"
        @deleted="refresh"
      />
    </template>
  </sw-list-tab>
</template>

<script lang="ts">
import { Component, Prop, Refs, ListComponent } from "sitewhere-ide-common";

import DeviceStatusListEntry from "../statuses/DeviceStatusListEntry.vue";
import DeviceStatusUpdateDialog from "../statuses/DeviceStatusUpdateDialog.vue";
import DeviceStatusDeleteDialog from "../statuses/DeviceStatusDeleteDialog.vue";

import { AxiosPromise } from "axios";
import { listDeviceStatuses } from "../../rest/sitewhere-device-statuses-api";
import {
  IDeviceStatus,
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceStatusListEntry,
    DeviceStatusUpdateDialog,
    DeviceStatusDeleteDialog
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
  @Prop() readonly deviceTypeToken!: string;

  // References.
  $refs!: Refs<{
    edit: DeviceStatusUpdateDialog;
    delete: DeviceStatusDeleteDialog;
  }>;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceStatusSearchCriteria {
    let criteria: IDeviceStatusSearchCriteria = {};
    criteria.deviceTypeToken = this.deviceTypeToken;
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
  onDeleteStatus(status: IDeviceStatus) {
    this.$refs.delete.open(status.token);
  }
}
</script>

<style scoped>
</style>
