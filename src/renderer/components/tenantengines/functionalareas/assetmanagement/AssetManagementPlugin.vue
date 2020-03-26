<template>
  <tenant-engine-plugin :configuration="configuration">
    <sw-content-section icon="fa-database" title="Asset Management Datastore">
      <datastore-selector
        :datastore="datastore"
        :instance="instanceManagement"
        @unsetDatastore="onUnsetDatastore"
      />
    </sw-content-section>
  </tenant-engine-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import TenantEnginePlugin from "../../common/TenantEnginePlugin.vue";
import DatastoreSelector from "../../../configuration/DatastoreSelector.vue";

import { ITenantEngineConfiguration } from "sitewhere-rest-api";
import {
  IAssetManagementConfiguration,
  IDatastoreDefinition
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { TenantEnginePlugin, DatastoreSelector }
})
export default class AssetManagementPlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get tenant configuration for asset management */
  get assetManagement(): IAssetManagementConfiguration {
    return this.configuration ? this.configuration.tenantConfiguration : null;
  }

  /** Get instance configuraton information */
  get instanceManagement(): IInstanceConfiguration | null {
    return this.configuration ? this.configuration.instanceConfiguration : null;
  }

  /** Get datastore definition */
  get datastore(): IDatastoreDefinition | null {
    return this.assetManagement ? this.assetManagement.datastore : null;
  }

  onUnsetDatastore(): void {
    if (this.assetManagement) {
      (this.assetManagement as any).datastore = null;
    }
  }
}
</script>

<style scoped></style>
