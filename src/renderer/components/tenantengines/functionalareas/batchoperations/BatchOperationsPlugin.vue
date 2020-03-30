<template>
  <tenant-engine-plugin :configuration="configuration">
    <sw-content-section icon="fa-database" title="Batch Operations Datastore">
      <datastore-selector
        :datastore="datastore"
        :instance="instanceManagement"
        @create="onCreateDatastore"
        @update="onUpdateDatastore"
        @unset="onUnsetDatastore"
      />
    </sw-content-section>
    <v-divider class="mt-4 mb-4" />
    <batch-operation-manager-section
      :configuration="batchOperationManager"
      @update="onBatchOperationManagerUpdate"
    />
  </tenant-engine-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import TenantEnginePlugin from "../../common/TenantEnginePlugin.vue";
import DatastoreSelector from "../../../configuration/DatastoreSelector.vue";
import BatchOperationManagerSection from "./batchoperationmanager/BatchOperationManagerSection.vue";

import { ITenantEngineConfiguration } from "sitewhere-rest-api";
import {
  IBatchOperationsConfiguration,
  IBatchOperationManagerConfiguration,
  IDatastoreDefinition
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: {
    TenantEnginePlugin,
    DatastoreSelector,
    BatchOperationManagerSection
  }
})
export default class BatchOperationsPlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get tenant configuration for batch operations */
  get batchOperations(): IBatchOperationsConfiguration {
    return this.configuration ? this.configuration.tenantConfiguration : null;
  }

  /** Get instance configuraton information */
  get instanceManagement(): IInstanceConfiguration | null {
    return this.configuration ? this.configuration.instanceConfiguration : null;
  }

  /** Get datastore definition */
  get datastore(): IDatastoreDefinition | null {
    return this.batchOperations ? this.batchOperations.datastore : null;
  }

  /** Get batch operation manager configuration */
  get batchOperationManager(): IBatchOperationManagerConfiguration | null {
    return this.batchOperations
      ? this.batchOperations.batchOperationManager
      : null;
  }

  /** Create new datastore */
  onCreateDatastore(definition: IDatastoreDefinition) {
    this.batchOperations.datastore = definition;
  }

  /** Update datastore */
  onUpdateDatastore(definition: IDatastoreDefinition) {
    this.batchOperations.datastore = definition;
  }

  /** Unset the datastore */
  onUnsetDatastore(): void {
    if (this.batchOperations) {
      (this.batchOperations as any).datastore = null;
    }
  }

  /** Handle batch operation manager updates */
  onBatchOperationManagerUpdate(updated: IBatchOperationManagerConfiguration) {
    if (this.batchOperations) {
      this.batchOperations.batchOperationManager = updated;
    }
  }
}
</script>

<style scoped></style>
