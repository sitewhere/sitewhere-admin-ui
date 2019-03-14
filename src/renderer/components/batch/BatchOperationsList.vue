<template>
  <div>
    <navigation-page
      icon="list-alt"
      title="Manage Batch Operations"
      loadingMessage="Loading batch operations ..."
      :loaded="loaded"
    >
      <div slot="content">
        <v-layout row wrap v-if="operations">
          <v-flex xs12>
            <no-results-panel v-if="operations.length === 0" text="No Batch Operations Found"></no-results-panel>
            <v-data-table
              v-if="operations.length > 0"
              class="elevation-2 pa-0"
              :headers="headers"
              :items="operations"
              :hide-actions="true"
              no-data-text="No Batch Operations Found"
            >
              <template slot="items" slot-scope="props">
                <td width="15%" :title="props.item.operationType">{{ props.item.operationType }}</td>
                <td
                  width="15%"
                  :title="props.item.processingStatus"
                >{{ props.item.processingStatus }}</td>
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
        </v-layout>
        <pager :pageSizes="pageSizes" :results="results" @pagingUpdated="updatePaging"></pager>
      </div>
    </navigation-page>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";

import Pager from "../common/Pager.vue";
import NavigationPage from "../common/NavigationPage.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { formatDate, routeTo, handleError } from "../common/Utils";
import { IPageSizes, IPaging } from "../../libraries/navigation-model";
import { ITableHeaders } from "../../libraries/component-model";
import { listBatchOperations } from "../../rest/sitewhere-batch-operations-api";
import {
  IBatchOperation,
  IBatchOperationSearchResults,
  IBatchOperationSearchCriteria,
  IBatchOperationResponseFormat
} from "sitewhere-rest-api/dist/model/batch-operations-model";
import { AxiosResponse } from "axios";

@Component({
  components: {
    NavigationPage,
    Pager,
    NoResultsPanel
  }
})
export default class BatchOperationsList extends Vue {
  results: IBatchOperationSearchResults | null = null;
  paging: IPaging | null = null;
  operations: IBatchOperation[] = [];
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
  loaded: boolean = false;

  // Update paging values and run query.
  updatePaging(paging: IPaging) {
    this.$data.paging = paging;
    this.refresh();
  }

  // Refresh list.
  async refresh() {
    this.$data.loaded = false;
    var criteria: IBatchOperationSearchCriteria = {};
    var format: IBatchOperationResponseFormat = {};
    try {
      let response: AxiosResponse<
        IBatchOperationSearchResults
      > = await listBatchOperations(this.$store, criteria, format);
      this.results = response.data;
      this.operations = response.data.results;
    } catch (err) {
      handleError(err);
    }
    this.loaded = true;
  }

  // Called when page number is updated.
  onPageUpdated(pageNumber: number) {
    this.$data.pager.page = pageNumber;
    this.refresh();
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
