<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading batch operation ..."
    :loaded="loaded"
    :record="operation"
  >
    <template slot="header">
      <batch-operation-detail-header :record="operation" />
    </template>
    <template slot="tabs">
      <v-tab key="elements">Batch Operation Elements</v-tab>
    </template>
    <template slot="tab-items">
      <batch-operation-elements-list tabkey="elements" :operation="operation" />
    </template>
    <template slot="actions"></template>
    <template slot="dialogs"></template>
  </sw-detail-page>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import {
  INavigationSection,
  NavigationIcon,
  getBatchOperation
} from "sitewhere-ide-common";
import { DetailComponent } from "sitewhere-ide-components";

import BatchOperationDetailHeader from "./BatchOperationDetailHeader.vue";
import BatchOperationElementsList from "./BatchOperationElementsList.vue";

import { AxiosPromise } from "axios";
import {
  IBatchOperation,
  IBatchOperationResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    BatchOperationDetailHeader,
    BatchOperationElementsList
  }
})
export default class BatchOperationDetail extends DetailComponent<
  IBatchOperation
> {
  get operation(): IBatchOperation | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.BatchOperation;
  }

  get title(): string {
    return this.operation
      ? `Manage batch operation ${this.operation.token}`
      : "Manage batch operation";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IBatchOperation> {
    const format: IBatchOperationResponseFormat = {};
    return getBatchOperation(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(item: IBatchOperation) {
    const section: INavigationSection = {
      id: "batches",
      title: "Batch Operations",
      icon: NavigationIcon.BatchOperation,
      route: "/admin/batch/" + item.token,
      longTitle: "Manage Batch Operation: " + item.token
    };
    this.$store.commit("currentSection", section);
  }
}
</script>
