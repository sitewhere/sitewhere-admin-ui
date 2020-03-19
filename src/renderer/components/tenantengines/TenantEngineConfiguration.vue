<template>
  <sw-content-tab :tabkey="tabkey" :loaded="true" loadingMessage="Loading...">
    <device-management-plugin
      :configuration="configuration"
      v-if="functionalArea == 'device-management'"
    />
    <event-sources-plugin
      :configuration="configuration"
      v-if="functionalArea == 'event-sources'"
    />
    <tenant-engine-plugin v-else :configuration="configuration"
      >No Plugin Found for Functional Area:
      {{ functionalArea }}</tenant-engine-plugin
    >
  </sw-content-tab>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import Vue from "vue";
import { ITenantEngineConfiguration } from "sitewhere-rest-api";

import TenantEnginePlugin from "./common/TenantEnginePlugin.vue";
import DeviceManagementPlugin from "./functionalareas/devicemanagement/DeviceManagementPlugin.vue";
import EventSourcesPlugin from "./functionalareas/eventsources/EventSourcesPlugin.vue";

@Component({
  components: { DeviceManagementPlugin, EventSourcesPlugin, TenantEnginePlugin }
})
export default class TenantMicroserviceConfiguration extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get functional area of microservice */
  get functionalArea(): string | null {
    return this.configuration
      ? this.configuration.microservice.functionalArea
      : null;
  }

  /** Get JSON for instance configuration */
  get instanceConfiguration(): string | null {
    return this.configuration
      ? JSON.stringify(this.configuration.instanceConfiguration, null, 2)
      : null;
  }

  /** Get JSON for microservice configuration */
  get microserviceConfiguration(): string | null {
    return this.configuration
      ? JSON.stringify(this.configuration.microserviceConfiguration, null, 2)
      : null;
  }

  /** Get JSON for tenant engine configuration */
  get tenantEngineConfiguration(): string | null {
    return this.configuration
      ? JSON.stringify(this.configuration.tenantConfiguration, null, 2)
      : null;
  }
}
</script>

<style scoped></style>
