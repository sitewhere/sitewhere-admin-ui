<template>
  <tenant-engine-plugin :configuration="configuration">
    <sw-content-section icon="fa-database" title="Device Management Datastore">
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
  IDeviceManagementConfiguration,
  IDatastoreDefinition
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { TenantEnginePlugin, DatastoreSelector }
})
export default class DeviceManagementPlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get tenant configuration for device management */
  get deviceManagement(): IDeviceManagementConfiguration {
    return this.configuration ? this.configuration.tenantConfiguration : null;
  }

  /** Get instance configuraton information */
  get instanceManagement(): IInstanceConfiguration | null {
    return this.configuration ? this.configuration.instanceConfiguration : null;
  }

  /** Get datastore definition */
  get datastore(): IDatastoreDefinition | null {
    return this.deviceManagement ? this.deviceManagement.datastore : null;
  }

  onUnsetDatastore(): void {
    if (this.deviceManagement) {
      this.deviceManagement.datastore = null;
    }
  }
}
</script>

<style scoped></style>
