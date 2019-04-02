<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs12 v-for="(assignment) in matches" :key="assignment.token">
        <assignment-list-entry
          :assignment="assignment"
          @assignmentOpened="onOpenAssignment(assignment)"
          @refresh="refresh"
        />
      </v-flex>
    </list-layout>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";

import ListTab from "../common/ListTab.vue";
import ListLayout from "../common/ListLayout.vue";
import AssignmentListEntry from "../assignments/AssignmentListEntry.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
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
    ListTab,
    ListLayout,
    AssignmentListEntry
  }
})
export default class AreaAssignments extends ListComponent<
  IDeviceAssignment,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly assetToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceAssignmentSearchCriteria {
    let criteria: IDeviceAssignmentSearchCriteria = {};
    criteria.assetToken = this.assetToken;
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
    store: Store<SiteWhereUiSettings>,
    criteria: IDeviceAssignmentSearchCriteria,
    format: IDeviceAssignmentResponseFormat
  ): AxiosPromise<IDeviceAssignmentSearchResults> {
    return listDeviceAssignments(store, criteria, format);
  }

  /** Open device assignment detail page */
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }
}
</script>

<style scoped>
</style>
