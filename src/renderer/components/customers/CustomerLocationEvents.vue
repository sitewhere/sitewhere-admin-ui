<template>
  <sw-data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading customer locations ..."
  >
    <template slot="items" slot-scope="props">
      <td width="40%" :title="props.item.assetName">{{ props.item.assetName }}</td>
      <td
        width="40%"
        title="Lat/Lon/Elevation"
      >{{ fourDecimalPlaces(props.item.latitude) + ', ' + fourDecimalPlaces(props.item.longitude) + ', ' + fourDecimalPlaces(props.item.elevation) }}</td>
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

import { formatDate, fourDecimalPlaces } from "../common/Utils";
import { EventPageSizes, LocationHeaders } from "../../libraries/constants";
import { AxiosPromise } from "axios";
import { listLocationsForCustomer } from "../../rest/sitewhere-customers-api";
import {
  IDeviceLocation,
  IDeviceLocationResponseFormat,
  IDeviceLocationSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({})
export default class CustomerLocationEvents extends ListComponent<
  IDeviceLocation,
  IDateRangeSearchCriteria,
  IDeviceLocationResponseFormat,
  IDeviceLocationSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly customerToken!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = LocationHeaders;

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    let criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceLocationResponseFormat {
    let format: IDeviceLocationResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceLocationResponseFormat
  ): AxiosPromise<IDeviceLocationSearchResults> {
    return listLocationsForCustomer(
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

  /** Make function available to template */
  fourDecimalPlaces(value: number) {
    return fourDecimalPlaces(value);
  }
}
</script>

<style scoped>
</style>
