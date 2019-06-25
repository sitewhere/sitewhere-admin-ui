<template>
  <sw-data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading area measurements ..."
  >
    <template slot="items" slot-scope="props">
      <td width="30%" :title="props.item.assetName">{{ props.item.assetName }}</td>
      <td width="25%" :title="props.item.name">{{ props.item.name }}</td>
      <td width="25%" :title="props.item.value">{{ props.item.value }}</td>
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
import { AxiosPromise } from "axios";
import { formatDate } from "../common/Utils";
import { EventPageSizes, MeasurementHeaders } from "../../libraries/constants";
import { listMeasurementsForArea } from "../../rest/sitewhere-areas-api";
import {
  IDeviceMeasurement,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({})
export default class AreaMeasurementEvents extends ListComponent<
  IDeviceMeasurement,
  IDateRangeSearchCriteria,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly areaToken!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = MeasurementHeaders;

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    let criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceMeasurementResponseFormat {
    let format: IDeviceMeasurementResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceMeasurementResponseFormat
  ): AxiosPromise<IDeviceMeasurementSearchResults> {
    return listMeasurementsForArea(
      this.$store,
      this.areaToken,
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
