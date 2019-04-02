<template>
  <data-table-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading area alerts ..."
  >
    <template slot="items" slot-scope="props">
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
    </template>
  </data-table-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";

import DataTableTab from "../common/DataTableTab.vue";

import { Store } from "vuex";
import { formatDate } from "../common/Utils";
import { IPageSizes, ITableHeaders } from "../../libraries/navigation-model";
import { EventPageSizes, AlertHeaders } from "../../libraries/constants";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listAlertsForArea } from "../../rest/sitewhere-areas-api";
import {
  IDeviceAlert,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    DataTableTab
  }
})
export default class CustomerMeasurementEvents extends ListComponent<
  IDeviceAlert,
  IDateRangeSearchCriteria,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly areaToken!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = AlertHeaders;

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
    store: Store<SiteWhereUiSettings>,
    criteria: IDateRangeSearchCriteria,
    format: IDeviceAlertResponseFormat
  ): AxiosPromise<IDeviceAlertSearchResults> {
    return listAlertsForArea(store, this.areaToken, criteria, format);
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>

<style scoped>
</style>
