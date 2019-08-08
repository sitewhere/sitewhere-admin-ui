<template>
  <sw-list-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs12 v-for="(assignment) in matches" :key="assignment.token">
        <assignment-list-entry
          :assignment="assignment"
          @assignmentOpened="onOpenAssignment(assignment)"
          @refresh="refresh"
        />
      </v-flex>
    </sw-list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>This area has no device assignments.</div>
      </no-results-panel>
    </template>
  </sw-list-tab>
</template>

<script lang="ts">
import { Component, Prop, ListComponent } from "sitewhere-ide-common";

import AssignmentListEntry from "../assignments/AssignmentListEntry.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { searchDeviceAssignments } from "../../rest/sitewhere-device-assignments-api";
import {
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentListEntry,
    NoResultsPanel
  }
})
export default class AreaAssignments extends ListComponent<
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly areaToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceAssignmentSearchCriteria {
    let criteria: IDeviceAssignmentSearchCriteria = {};
    criteria.areaTokens = [this.areaToken];
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceAssignmentResponseFormat {
    let format: IDeviceAssignmentResponseFormat = {};
    format.includeDevice = true;
    format.includeCustomer = true;
    format.includeArea = true;
    format.includeAsset = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceAssignmentSearchCriteria,
    format: IDeviceAssignmentResponseFormat
  ): AxiosPromise<IDeviceAssignmentSearchResults> {
    return searchDeviceAssignments(this.$store, criteria, format);
  }

  /** Open device assignment detail page */
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }
}
</script>
