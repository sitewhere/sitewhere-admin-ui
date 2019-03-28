<template>
  <list-page
    :icon="icon"
    title="Batch Operations"
    loadingMessage="Loading batch operations ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="matches"
        :hide-actions="true"
        no-data-text="No Batch Operations Found"
      >
        <template slot="items" slot-scope="props">
          <td width="15%" :title="props.item.operationType">{{ props.item.operationType }}</td>
          <td width="15%" :title="props.item.processingStatus">{{ props.item.processingStatus }}</td>
          <td
            width="15%"
            style="white-space: nowrap"
            :title="formatDate(props.item.createdDate)"
          >{{ formatDate(props.item.createdDate) }}</td>
          <td
            width="20%"
            style="white-space: nowrap"
            :title="formatDate(props.item.processingStartedDate)"
          >{{ formatDate(props.item.processingStartedDate) }}</td>
          <td
            width="20%"
            style="white-space: nowrap"
            :title="formatDate(props.item.processingEndedDate)"
          >{{ formatDate(props.item.processingEndedDate) }}</td>
          <td width="10%" title="View Batch Operation">
            <v-tooltip left>
              <v-btn
                dark
                icon
                class="green darken-2"
                slot="activator"
                @click.stop="openBatchOperation(props.item.token)"
              >
                <font-awesome-icon class="ma-1 navbutton" icon="arrow-right" size="lg"/>
              </v-btn>
              <span>Batch Operation Detail</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { NavigationIcon } from "../../libraries/constants";
import { formatDate, routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { IPageSizes, ITableHeaders } from "../../libraries/navigation-model";
import { listBatchOperations } from "../../rest/sitewhere-batch-operations-api";
import {
  IBatchOperation,
  IBatchOperationSearchCriteria,
  IBatchOperationResponseFormat,
  IBatchOperationSearchResults
} from "sitewhere-rest-api";

export class BatchOperationsListComponent extends ListComponent<
  IBatchOperation,
  IBatchOperationSearchCriteria,
  IBatchOperationResponseFormat,
  IBatchOperationSearchResults
> {}

@Component({
  components: {
    ListPage
  }
})
export default class BatchOperationsList extends Mixins(
  BatchOperationsListComponent
) {
  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Operation",
      value: "operation"
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
      text: "Created",
      value: "created"
    },
    {
      align: "left",
      sortable: false,
      text: "Processing Started",
      value: "started"
    },
    {
      align: "left",
      sortable: false,
      text: "Processing Finished",
      value: "finished"
    },
    {
      align: "left",
      sortable: false,
      text: "",
      value: "open"
    }
  ];
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

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.BatchOperation;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IBatchOperationSearchCriteria {
    let criteria: IBatchOperationSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IBatchOperationResponseFormat {
    let format: IBatchOperationResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IBatchOperationSearchCriteria,
    format: IBatchOperationResponseFormat
  ): AxiosPromise<IBatchOperationSearchResults> {
    return listBatchOperations(store, criteria, format);
  }

  // Open detail page for batch operation.
  openBatchOperation(token: string) {
    routeTo(this, "/batch/" + token);
  }

  // Format a date.
  formatDate(date: Date) {
    formatDate(date);
  }
}
</script>

<style scoped>
</style>
