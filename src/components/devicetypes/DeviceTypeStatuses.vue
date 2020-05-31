<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device commands..."
    :results="results"
  >
    <list-layout>
      <v-flex xs3 v-for="status in matches" :key="status.code">
        <div>
          <device-status-list-entry
            :deviceStatus="status"
            @edit="onEditStatus"
            @delete="onDeleteStatus"
          />
        </div>
      </v-flex>
    </list-layout>
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
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { listDeviceStatuses } from "sitewhere-ide-common";

import { ListComponent, ListTab, ListLayout } from "sitewhere-ide-components";

import DeviceStatusListEntry from "../statuses/DeviceStatusListEntry.vue";
import DeviceStatusUpdateDialog from "../statuses/DeviceStatusUpdateDialog.vue";
import DeviceStatusDeleteDialog from "../statuses/DeviceStatusDeleteDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceStatus,
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListTab,
    ListLayout,
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
  @Ref() readonly edit!: DeviceStatusUpdateDialog;
  @Ref() readonly delete!: DeviceStatusDeleteDialog;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceStatusSearchCriteria {
    const criteria: IDeviceStatusSearchCriteria = {};
    criteria.deviceTypeToken = this.deviceTypeToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceStatusResponseFormat {
    const format: IDeviceStatusResponseFormat = {};
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
    this.edit.open(status.token);
  }

  /** Open dialog to delete status */
  onDeleteStatus(status: IDeviceStatus) {
    this.delete.open(status.token);
  }
}
</script>

<style scoped>
</style>
