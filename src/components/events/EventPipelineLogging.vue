<template>
  <list-page
    :icon="icon"
    title="Pipeline Event Log"
    loadingMessage="Loading event pipeline logs ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs12>
      <v-data-table
        class="log-table"
        :headers="headers"
        :items="matches"
        :hide-default-footer="true"
        no-data-text="No Event Pipeline Log Entries Found"
      >
        <template slot="item" slot-scope="props">
          <tr>
            <td :title="props.item.source">
              <span
                style="max-width: 150px"
                class="d-inline-block text-truncate"
                >{{ props.item.source }}</span
              >
            </td>
            <td :title="props.item.level">
              <span
                style="max-width: 150px"
                class="d-inline-block text-truncate"
                >{{ props.item.level }}</span
              >
            </td>
            <td :title="props.item.deviceToken">
              <span
                style="max-width: 300px"
                class="d-inline-block text-truncate"
                >{{ props.item.deviceToken }}</span
              >
            </td>
            <td :title="props.item.microservice">
              <span
                style="max-width: 200px"
                class="d-inline-block text-truncate"
                >{{ props.item.microservice }}</span
              >
            </td>
            <td width="40%" :title="props.item.message">
              {{ props.item.message }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
    <template slot="actions">
      <delete-button tooltip="Clear Log" @action="onClearLog" />
    </template>
    <template slot="dialogs"> </template>
  </list-page>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import {
  IPageSizes,
  ITableHeaders,
  NavigationIcon,
  listInstancePipelineLogEntries,
  deleteInstancePipelineLogEntries,
  formatDate,
  handleError,
} from "sitewhere-ide-common";
import { ListComponent, ListPage } from "sitewhere-ide-components";

import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { AxiosPromise } from "axios";

import {
  IEventPipelineLog,
  IEventPipelineLogSearchCriteria,
  IEventPipelineLogResponseFormat,
  IEventPipelineLogSearchResults,
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    DeleteButton,
  },
})
export default class EventPipelineLogging extends ListComponent<
  IEventPipelineLog,
  IEventPipelineLogSearchCriteria,
  IEventPipelineLogResponseFormat,
  IEventPipelineLogSearchResults
> {
  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Source",
      value: "source",
    },
    {
      align: "left",
      sortable: false,
      text: "Level",
      value: "level",
    },
    {
      align: "left",
      sortable: false,
      text: "Device Token",
      value: "deviceToken",
    },
    {
      align: "left",
      sortable: false,
      text: "Microservice",
      value: "microservice",
    },
    {
      align: "left",
      sortable: false,
      text: "Message",
      value: "message",
    },
  ];
  pageSizes: IPageSizes = [
    {
      text: "25",
      value: 25,
    },
    {
      text: "50",
      value: 50,
    },
    {
      text: "100",
      value: 100,
    },
  ];

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IEventPipelineLogSearchCriteria {
    const criteria: IEventPipelineLogSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IEventPipelineLogResponseFormat {
    const format: IEventPipelineLogResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IEventPipelineLogSearchCriteria,
    format: IEventPipelineLogResponseFormat
  ): AxiosPromise<IEventPipelineLogSearchResults> {
    const tenant = this.$store.getters.selectedTenant;
    return listInstancePipelineLogEntries(
      this.$store,
      tenant.token,
      criteria,
      format
    );
  }

  /** Clear event pipeline log */
  onClearLog(): void {
    const tenant = this.$store.getters.selectedTenant;
    try {
      deleteInstancePipelineLogEntries(this.$store, tenant.token);
      this.refresh();
    } catch (err) {
      handleError(err);
    }
  }

  // Format a date.
  format(date: Date) {
    formatDate(date);
  }
}
</script>

<style scoped>
.log-table >>> td {
  font-size: 12px;
  height: 38px;
}
</style>