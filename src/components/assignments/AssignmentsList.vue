<template>
  <list-page
    :icon="icon"
    title="Manage Assignments"
    loadingMessage="Loading assignments ..."
    :loaded="loaded"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs12 v-for="assignment in matches" :key="assignment.token">
        <assignment-list-entry :assignment="assignment" @assignmentOpened="onOpenAssignment" />
      </v-flex>
    </list-layout>
    <template slot="filters">
      <assignment-list-filter-bar
        ref="filters"
        :criteria="filter"
        @update="onUpdateFilterCriteria"
        @clear="onClearFilterCriteria"
      />
    </template>
    <template slot="noresults">
      <no-results-panel>
        <div>No device assignments have been created for this tenant.</div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <assignment-list-filter-dialog ref="filterDialog" @payload="onFilterUpdated" />
      <invocation-by-assignment-criteria-create-dialog :filter="filter" ref="batch" />
    </template>
    <template slot="actions">
      <device-command-button
        v-if="hasOneDeviceType"
        tooltip="Execute Batch Command"
        @action="onBatchCommandInvocation"
      />
      <filter-button tooltip="Filter Device Assignment List" @action="onShowFilterCriteria" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import {
  IPageSizes,
  NavigationIcon,
  searchDeviceAssignmentSummaries,
} from "sitewhere-ide-common";
import { ListComponent, ListPage, ListLayout } from "sitewhere-ide-components";

import AssignmentListEntry from "./AssignmentListEntry.vue";
import AssignmentListFilterBar from "./AssignmentListFilterBar.vue";
import AssignmentCreateDialog from "./AssignmentCreateDialog.vue";
import AssignmentListFilterDialog from "./AssignmentListFilterDialog.vue";
import InvocationByAssignmentCriteriaCreateDialog from "../batch/InvocationByAssignmentCriteriaCreateDialog.vue";
import DeviceCommandButton from "../common/navbuttons/DeviceCommandButton.vue";
import FilterButton from "../common/navbuttons/FilterButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSummarySearchResults,
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    AssignmentListEntry,
    AssignmentListFilterBar,
    AssignmentCreateDialog,
    AssignmentListFilterDialog,
    InvocationByAssignmentCriteriaCreateDialog,
    DeviceCommandButton,
    FilterButton,
    NoResultsPanel,
  },
})
export default class AssignmentsList extends ListComponent<
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSummarySearchResults
> {
  @Ref() readonly filterDialog!: AssignmentListFilterDialog;
  @Ref() readonly batch!: InvocationByAssignmentCriteriaCreateDialog;

  filter: IDeviceAssignmentSearchCriteria = {};
  pageSizes: IPageSizes = [
    {
      text: "20",
      value: 20,
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
    return NavigationIcon.DeviceAssignment;
  }

  /** Indicates filter with exactly one device type */
  get hasOneDeviceType() {
    return (
      this.filter &&
      this.filter.deviceTypeTokens &&
      this.filter.deviceTypeTokens.length === 1
    );
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceAssignmentSearchCriteria {
    return this.filter;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceAssignmentResponseFormat {
    const format: IDeviceAssignmentResponseFormat = {};
    format.includeDevice = true;
    format.includeAsset = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceAssignmentSearchCriteria,
    format: IDeviceAssignmentResponseFormat
  ): AxiosPromise<IDeviceAssignmentSummarySearchResults> {
    return searchDeviceAssignmentSummaries(this.$store, criteria, format);
  }

  /** Called to show filter criteria dialog */
  onShowFilterCriteria() {
    this.filterDialog.load(this.filter);
    this.filterDialog.openDialog();
  }

  /** Update filter criteria */
  onUpdateFilterCriteria(updated: IDeviceAssignmentSearchCriteria) {
    this.filter = updated;
    this.refresh();
  }

  /** Clears the filter criteria */
  onClearFilterCriteria() {
    this.filter = {};
    this.filterDialog.reset();
    this.refresh();
  }

  /** Called when filter criteria are updated */
  onFilterUpdated(filter: IDeviceAssignmentSearchCriteria) {
    this.filterDialog.closeDialog();
    this.filter = filter;
    this.refresh();
  }

  /** Open device assignment detail page */
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }

  /** Called to invoke a batch command */
  onBatchCommandInvocation() {
    this.batch.open();
  }
}
</script>
