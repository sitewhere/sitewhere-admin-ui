<template>
  <sw-data-table-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading batch elements ..."
  >
    <template slot="items" slot-scope="props">
      <td
        width="40%"
        style="cursor: pointer;"
        @click="onOpenDevice(props.item.device)"
        :title="props.item.device.token"
      >
        <v-icon small class="grey--text">{{deviceIcon}}</v-icon>
        {{ props.item.device.token }}
      </td>
      <td width="20%" :title="props.item.processingStatus">{{ props.item.processingStatus }}</td>
      <td
        width="20%"
        style="white-space: nowrap"
        :title="formatDate(props.item.processedDate)"
      >{{ formatDate(props.item.processedDate) }}</td>
      <td
        width="20%"
        style="white-space: nowrap"
        :title="props.item.metadata.invocation"
      >{{ props.item.metadata.invocation }}</td>
    </template>
    <template slot="dialogs"></template>
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
import { formatDate, routeTo } from "../common/Utils";
import { NavigationIcon } from "../../libraries/constants";
import { listBatchOperationElements } from "../../rest/sitewhere-batch-operations-api";
import {
  IDevice,
  IBatchOperation,
  IBatchElement,
  IBatchElementSearchCriteria,
  IBatchElementResponseFormat,
  IBatchElementSearchResults
} from "sitewhere-rest-api";

@Component({})
export default class BatchOperationsElementsList extends ListComponent<
  IBatchElement,
  IBatchElementSearchCriteria,
  IBatchElementResponseFormat,
  IBatchElementSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly operation!: IBatchOperation;

  deviceIcon: NavigationIcon = NavigationIcon.Device;
  pageSizes: IPageSizes = [
    {
      text: "25",
      value: 25
    },
    {
      text: "50",
      value: 50
    },
    {
      text: "100",
      value: 100
    }
  ];

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Device Token",
      value: "token"
    },
    {
      align: "left",
      sortable: false,
      text: "Status",
      value: "status"
    },
    {
      align: "left",
      sortable: false,
      text: "Processed Date",
      value: "processed"
    },
    {
      align: "left",
      sortable: false,
      text: "Invocation Event",
      value: "invocation"
    }
  ];

  /** Build search criteria for list */
  buildSearchCriteria(): IBatchElementSearchCriteria {
    let criteria: IBatchElementSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IBatchElementResponseFormat {
    let format: IBatchElementResponseFormat = { includeDevice: true };
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IBatchElementSearchCriteria,
    format: IBatchElementResponseFormat
  ): AxiosPromise<IBatchElementSearchResults> {
    return listBatchOperationElements(
      this.$store,
      this.operation.token,
      criteria,
      format
    );
  }

  /** Called to open detail page for device */
  onOpenDevice(device: IDevice) {
    routeTo(this, "/devices/" + device.token);
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
