<template>
  <data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading customer alerts ..."
  >
    <template slot="item" slot-scope="props">
      <tr>
        <td width="30%" :title="props.item.assetName">{{ props.item.assetName }}</td>
        <td width="20%" :title="props.item.type">{{ props.item.type }}</td>
        <td width="30%" :title="props.item.message">{{ props.item.message }}</td>
        <td
          width="10%"
          style="white-space: nowrap"
          :title="formatDate(props.item.eventDate)"
        >{{ formatDate(props.item.eventDate) }}</td>
        <td
          width="10%"
          style="white-space: nowrap"
          :title="formatDate(props.item.receivedDate)"
        >{{ formatDate(props.item.receivedDate) }}</td>
      </tr>
    </template>
  </data-table-tab>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import {
  IPageSizes,
  ITableHeaders,
  listAlertsForCustomer,
} from "sitewhere-ide-common";
import { ListComponent, DataTableTab } from "sitewhere-ide-components";

import { formatDate } from "sitewhere-ide-common";
import { EventPageSizes, AlertHeaders } from "../../libraries/constants";
import { AxiosPromise } from "axios";
import {
  IDeviceAlert,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults,
  IDateRangeSearchCriteria,
} from "sitewhere-rest-api";

@Component({ components: { DataTableTab } })
export default class CustomerAlertEvents extends ListComponent<
  IDeviceAlert,
  IDateRangeSearchCriteria,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly customerToken!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = AlertHeaders;

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    const criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceAlertResponseFormat {
    const format: IDeviceAlertResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceAlertResponseFormat
  ): AxiosPromise<IDeviceAlertSearchResults> {
    return listAlertsForCustomer(
      this.$store,
      this.customerToken,
      criteria,
      format
    );
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
