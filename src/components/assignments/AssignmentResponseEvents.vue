<template>
  <data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading assignment command responses ..."
  >
    <template slot="item" slot-scope="props">
      <tr>
        <td width="20%" :title="props.item.originatingEventId">{{ props.item.originatingEventId }}</td>
        <td width="30%" :title="props.item.response">{{ props.item.response }}</td>
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
  listCommandResponsesForAssignment
} from "sitewhere-ide-common";
import { ListComponent, DataTableTab } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { formatDate } from "sitewhere-ide-common";
import { EventPageSizes, ResponseHeaders } from "../../libraries/constants";
import {
  IDeviceCommandResponse,
  IDeviceCommandResponseResponseFormat,
  IDeviceCommandResponseSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({ components: { DataTableTab } })
export default class AssignmentResponseEvents extends ListComponent<
  IDeviceCommandResponse,
  IDateRangeSearchCriteria,
  IDeviceCommandResponseResponseFormat,
  IDeviceCommandResponseSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly token!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = ResponseHeaders;

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    const criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceCommandResponseResponseFormat {
    const format: IDeviceCommandResponseResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceCommandResponseResponseFormat
  ): AxiosPromise<IDeviceCommandResponseSearchResults> {
    return listCommandResponsesForAssignment(
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
