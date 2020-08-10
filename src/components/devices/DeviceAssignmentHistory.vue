<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device assigments..."
  >
    <v-container class="pa-2" fluid grid-list-md fill-height>
      <v-layout align-content-start row wrap>
        <v-flex xs12 v-for="assignment in matches" :key="assignment.token">
          <assignment-list-entry
            :assignment="assignment"
            @assignmentOpened="onOpenAssignment(assignment)"
            @refresh="refresh"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { searchDeviceAssignmentSummaries } from "sitewhere-ide-common";
import { ListComponent, ListTab } from "sitewhere-ide-components";

import AssignmentListEntry from "../assignments/AssignmentListEntry.vue";

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
    ListTab,
    AssignmentListEntry,
  },
})
export default class DeviceAssignmentHistory extends ListComponent<
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSummarySearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceAssignmentSearchCriteria {
    const criteria: IDeviceAssignmentSearchCriteria = {};
    criteria.deviceTokens = [this.deviceToken];
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

<style scoped></style>
