<template>
  <sw-list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device assigments..."
  >
    <v-container class="pa-2" fluid grid-list-md fill-height>
      <v-layout align-content-start row wrap>
        <v-flex xs12 v-for="(assignment) in matches" :key="assignment.token">
          <assignment-list-entry
            :assignment="assignment"
            @assignmentOpened="onOpenAssignment(assignment)"
            @refresh="refresh"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </sw-list-tab>
</template>

<script lang="ts">
import { Component, Prop, ListComponent } from "sitewhere-ide-common";

import AssignmentListEntry from "../assignments/AssignmentListEntry.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDeviceAssignmentHistory } from "../../rest/sitewhere-devices-api";
import {
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentListEntry
  }
})
export default class DeviceAssignmentHistory extends ListComponent<
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceAssignmentSearchCriteria {
    let criteria: IDeviceAssignmentSearchCriteria = {};
    criteria.deviceTokens = [this.deviceToken];
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
    return listDeviceAssignmentHistory(
      this.$store,
      this.deviceToken,
      criteria,
      format
    );
  }

  /** Open device assignment detail page */
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }
}
</script>

<style scoped>
</style>
