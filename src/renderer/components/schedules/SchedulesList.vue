<template>
  <sw-list-page
    :icon="icon"
    title="Schedules"
    loadingMessage="Loading schedules ..."
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
            <actions-block
              @edit="onEditSchedule(props.item.token)"
              @delete="onDeleteSchedule(props.item.token)"
            />
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <template slot="noresults">
      <no-results-panel>
        <div>No schedules have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{addIcon}}</v-icon>in the toolbar to add a schedule.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <schedule-create-dialog ref="add" @created="onScheduleAdded" />
      <schedule-update-dialog ref="edit" @updated="refresh" />
      <schedule-delete-dialog ref="delete" @deleted="refresh" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Schedule" @action="onAddSchedule" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import {
  Component,
  ListComponent,
  IPageSizes,
  ITableHeaders,
  Refs
} from "sitewhere-ide-common";

import ActionsBlock from "../common/ActionsBlock.vue";
import ScheduleCreateDialog from "./ScheduleCreateDialog.vue";
import ScheduleUpdateDialog from "./ScheduleUpdateDialog.vue";
import ScheduleDeleteDialog from "./ScheduleDeleteDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { NavigationIcon } from "../../libraries/constants";
import { formatDate } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listSchedules } from "../../rest/sitewhere-schedules-api";
import {
  ISchedule,
  IScheduleSearchCriteria,
  IScheduleResponseFormat,
  IScheduleSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ActionsBlock,
    ScheduleCreateDialog,
    ScheduleUpdateDialog,
    ScheduleDeleteDialog,
    AddButton,
    NoResultsPanel
  }
})
export default class SchedulesList extends ListComponent<
  ISchedule,
  IScheduleSearchCriteria,
  IScheduleResponseFormat,
  IScheduleSearchResults
> {
  $refs!: Refs<{
    add: ScheduleCreateDialog;
    edit: ScheduleUpdateDialog;
    delete: ScheduleDeleteDialog;
  }>;

  addIcon: string = NavigationIcon.Add;

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
    criteria: IScheduleSearchCriteria,
    format: IScheduleResponseFormat
  ): AxiosPromise<IScheduleSearchResults> {
    return listSchedules(this.$store, criteria, format);
  }

  /** Called to open dialog */
  onAddSchedule() {
    this.$refs.add.open();
  }

  /** Called after add */
  onScheduleAdded() {
    this.refresh();
  }

  /** Open edit dialog */
  onEditSchedule(token: string) {
    this.$refs.edit.open(token);
  }

  /** Open delete dialog */
  onDeleteSchedule(token: string) {
    this.$refs.delete.open(token);
  }

  /** Format a date */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
