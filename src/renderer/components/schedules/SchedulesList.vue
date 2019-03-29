<template>
  <list-page
    :icon="icon"
    title="Schedules"
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
        no-data-text="No Schedules Found"
      >
        <template slot="items" slot-scope="props">
          <td width="17%" :title="props.item.name">{{ props.item.name }}</td>
          <td width="15%" :title="props.item.triggerType">{{ props.item.triggerType }}</td>
          <td width="35%" :title="props.item.token">{{ props.item.token }}</td>
          <td
            width="18%"
            :title="formatDate(props.item.createdDate)"
          >{{ formatDate(props.item.createdDate) }}</td>
          <td width="15%">
            <actions-block @edited="refresh" @deleted="refresh">
              <schedule-update-dialog slot="edit" :token="props.item.token"></schedule-update-dialog>
              <schedule-delete-dialog slot="delete" :token="props.item.token"></schedule-delete-dialog>
            </actions-block>
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
import ActionsBlock from "../common/ActionsBlock.vue";
import ScheduleCreateDialog from "./ScheduleCreateDialog.vue";
import ScheduleUpdateDialog from "./ScheduleUpdateDialog.vue";
import ScheduleDeleteDialog from "./ScheduleDeleteDialog.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { NavigationIcon } from "../../libraries/constants";
import { formatDate, routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { IPageSizes, ITableHeaders } from "../../libraries/navigation-model";
import { listSchedules } from "../../rest/sitewhere-schedules-api";
import {
  ISchedule,
  IScheduleSearchCriteria,
  IScheduleResponseFormat,
  IScheduleSearchResults
} from "sitewhere-rest-api";

export class SchedulesListComponent extends ListComponent<
  ISchedule,
  IScheduleSearchCriteria,
  IScheduleResponseFormat,
  IScheduleSearchResults
> {}

@Component({
  components: {
    ListPage,
    ActionsBlock,
    ScheduleCreateDialog,
    ScheduleUpdateDialog,
    ScheduleDeleteDialog
  }
})
export default class SchedulesList extends Mixins(SchedulesListComponent) {
  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Name",
      value: "name"
    },
    {
      align: "left",
      sortable: false,
      text: "Type",
      value: "type"
    },
    {
      align: "left",
      sortable: false,
      text: "Token",
      value: "token"
    },
    {
      align: "left",
      sortable: false,
      text: "Created Date",
      value: "created"
    },
    {
      align: "left",
      sortable: false,
      text: "Actions",
      value: "actions"
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
    return NavigationIcon.Schedule;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IScheduleSearchCriteria {
    let criteria: IScheduleSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IScheduleResponseFormat {
    let format: IScheduleResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IScheduleSearchCriteria,
    format: IScheduleResponseFormat
  ): AxiosPromise<IScheduleSearchResults> {
    return listSchedules(store, criteria, format);
  }

  // Called to open dialog.
  onAddSchedule() {
    (this.$refs.add as any).onOpenDialog();
  }

  // Format a date.
  formatDate(date: Date) {
    formatDate(date);
  }
}
</script>

<style scoped>
</style>
