<template>
  <sw-list-page
    :icon="icon"
    title="Manage Assignments"
    loadingMessage="Loading assignments ..."
    :loaded="loaded"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs12 v-for="(assignment) in matches" :key="assignment.token">
        <assignment-list-entry :assignment="assignment" @assignmentOpened="onOpenAssignment"/>
      </v-flex>
    </sw-list-layout>
    <template slot="filters">
      <!--
      <device-list-filter-bar ref="filters" @filter="onFilterUpdated"></device-list-filter-bar>
      -->
    </template>
    <template slot="dialogs">
      <!--
      <assignment-create-dialog ref="assign" @assignmentCreated="onAssignmentCreated"></assignment-create-dialog>
      -->
    </template>
    <template slot="actions">
      <add-button tooltip="Create Assignment"/>
      <filter-button tooltip="Filter Device List"/>
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import {
  Component,
  ListComponent,
  IPageSizes,
  Refs
} from "sitewhere-ide-common";

import AssignmentListEntry from "./AssignmentListEntry.vue";
import AssignmentCreateDialog from "./AssignmentCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import FilterButton from "../common/navbuttons/FilterButton.vue";

import { NavigationIcon } from "../../libraries/constants";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDeviceAssignments } from "../../rest/sitewhere-device-assignments-api";
import {
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentListEntry,
    AssignmentCreateDialog,
    AddButton,
    FilterButton
  }
})
export default class AssignmentsList extends ListComponent<
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
> {
  $refs!: Refs<{}>;

  filter: {} = {};
  pageSizes: IPageSizes = [
    {
      text: "20",
      value: 20
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
    return NavigationIcon.DeviceAssignment;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceAssignmentSearchCriteria {
    let criteria: IDeviceAssignmentSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceAssignmentResponseFormat {
    let format: IDeviceAssignmentResponseFormat = {};
    format.includeDevice = true;
    format.includeAsset = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceAssignmentSearchCriteria,
    format: IDeviceAssignmentResponseFormat
  ): AxiosPromise<IDeviceAssignmentSearchResults> {
    return listDeviceAssignments(this.$store, criteria, format);
  }

  // Called to show filter criteria dialog.
  onShowFilterCriteria() {}

  /** Open device assignment detail page */
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }
}
</script>

<style scoped>
</style>
