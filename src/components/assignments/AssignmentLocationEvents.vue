<template>
  <data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading assignment locations ..."
  >
    <template slot="item" slot-scope="props">
      <tr>
        <td width="50%" title="Lat/Lon/Elevation">
          {{
          fourDecimalPlaces(props.item.latitude) +
          ", " +
          fourDecimalPlaces(props.item.longitude) +
          ", " +
          fourDecimalPlaces(props.item.elevation)
          }}
        </td>
        <td
          width="25%"
          style="white-space: nowrap"
          :title="formatDate(props.item.eventDate)"
        >{{ formatDate(props.item.eventDate) }}</td>
        <td
          width="25%"
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
  listLocationsForAssignment
} from "sitewhere-ide-common";
import { ListComponent, DataTableTab } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { formatDate, fourDecimalPlaces } from "sitewhere-ide-common";
import {
  EventPageSizes,
  AssignmentLocationHeaders
} from "../../libraries/constants";
import {
  IDeviceLocation,
  IDeviceLocationResponseFormat,
  IDeviceLocationSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({ components: { DataTableTab } })
export default class AssignmentLocationEvents extends ListComponent<
  IDeviceLocation,
  IDateRangeSearchCriteria,
  IDeviceLocationResponseFormat,
  IDeviceLocationSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly token!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = AssignmentLocationHeaders;

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    const criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceLocationResponseFormat {
    const format: IDeviceLocationResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceLocationResponseFormat
  ): AxiosPromise<IDeviceLocationSearchResults> {
    return listLocationsForAssignment(
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

  /** Make function available to template */
  fourDecimalPlaces(value: number) {
    return fourDecimalPlaces(value);
  }
}
</script>
