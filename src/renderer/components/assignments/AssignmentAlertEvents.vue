<template>
  <sw-data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading assignmnet alerts ..."
  >
    <template slot="items" slot-scope="props">
      <td width="20%" :title="props.item.type">{{ props.item.type }}</td>
      <td width="50%" :title="props.item.message">{{ props.item.message }}</td>
      <td
        width="15%"
        style="white-space: nowrap"
        :title="formatDate(props.item.eventDate)"
      >{{ formatDate(props.item.eventDate) }}</td>
      <td
        width="15%"
        style="white-space: nowrap"
        :title="formatDate(props.item.receivedDate)"
      >{{ formatDate(props.item.receivedDate) }}</td>
    </template>
  </sw-data-table-tab>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  ListComponent,
  IPageSizes,
  ITableHeaders
} from "sitewhere-ide-common";

import { formatDate } from "../common/Utils";
import {
  EventPageSizes,
  AssignmentAlertHeaders
} from "../../libraries/constants";
import { AxiosPromise } from "axios";
import { listAlertsForAssignment } from "../../rest/sitewhere-device-assignments-api";
import {
  IDeviceAlert,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({})
export default class AssignmentAlertEvents extends ListComponent<
  IDeviceAlert,
  IDateRangeSearchCriteria,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly token!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = AssignmentAlertHeaders;

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    let criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceAlertResponseFormat {
    let format: IDeviceAlertResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceAlertResponseFormat
  ): AxiosPromise<IDeviceAlertSearchResults> {
    return listAlertsForAssignment(this.$store, this.token, criteria, format);
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
