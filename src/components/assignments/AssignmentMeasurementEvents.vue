<template>
  <data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading assignment measurements ..."
  >
    <template slot="item" slot-scope="props">
      <tr>
        <td width="35%" :title="props.item.name">{{ props.item.name }}</td>
        <td width="35%" :title="props.item.value">{{ props.item.value }}</td>
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
      </tr>
    </template>
  </data-table-tab>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import {
  IPageSizes,
  ITableHeaders,
  listMeasurementsForAssignment
} from "sitewhere-ide-common";
import { ListComponent, DataTableTab } from "sitewhere-ide-components";
import { AxiosPromise } from "axios";
import { formatDate } from "sitewhere-ide-common";
import {
  EventPageSizes,
  AssignmentMeasurementHeaders
} from "../../libraries/constants";
import {
  IDeviceMeasurement,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({ components: { DataTableTab } })
export default class AreaMeasurementEvents extends ListComponent<
  IDeviceMeasurement,
  IDateRangeSearchCriteria,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly token!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = AssignmentMeasurementHeaders;

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    const criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceMeasurementResponseFormat {
    const format: IDeviceMeasurementResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceMeasurementResponseFormat
  ): AxiosPromise<IDeviceMeasurementSearchResults> {
    return listMeasurementsForAssignment(
      this.$store,
      this.token,
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
