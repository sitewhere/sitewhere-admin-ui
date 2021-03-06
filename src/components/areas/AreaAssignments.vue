<template>
  <list-tab :tabkey="tabkey" :loaded="loaded" :results="results" @pagingUpdated="onPagingUpdated">
    <list-layout>
      <v-flex xs12 v-for="assignment in matches" :key="assignment.token">
        <assignment-list-entry
          :assignment="assignment"
          @assignmentOpened="onOpenAssignment(assignment)"
          @refresh="refresh"
        />
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>This area has no device assignments.</div>
      </no-results-panel>
    </template>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { ListComponent, ListTab, ListLayout } from "sitewhere-ide-components";

import AssignmentListEntry from "../assignments/AssignmentListEntry.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { routeTo, searchDeviceAssignmentSummaries } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSummarySearchResults,
} from "sitewhere-rest-api";

@Component({
  components: {
    ListTab,
    ListLayout,
    AssignmentListEntry,
    NoResultsPanel,
  },
})
export default class AreaAssignments extends ListComponent<
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSummarySearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly areaToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceAssignmentSearchCriteria {
    const criteria: IDeviceAssignmentSearchCriteria = {};
    criteria.areaTokens = [this.areaToken];
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceAssignmentResponseFormat {
    const format: IDeviceAssignmentResponseFormat = {};
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
  ): AxiosPromise<IDeviceAssignmentSummarySearchResults> {
    return searchDeviceAssignmentSummaries(this.$store, criteria, format);
  }

  /** Open device assignment detail page */
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }
}
</script>
