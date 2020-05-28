<template>
  <sw-content-tab :tabkey="tabkey" :loaded="true" loadingMessage="Loading...">
    <sw-asset-management-config-plugin
      :configuration="configuration"
      v-if="functionalArea == 'asset-management'"
      @dirty="markDirty"
    />
    <sw-batch-operations-config-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'batch-operations'"
      @dirty="markDirty"
    />
    <sw-command-delivery-config-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'command-delivery'"
      @dirty="markDirty"
    />
    <sw-device-management-config-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'device-management'"
      @dirty="markDirty"
    />
    <sw-event-sources-config-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'event-sources'"
      @dirty="markDirty"
    />
    <sw-tenant-engine-plugin v-else :configuration="configuration">
      No Plugin Found for Functional Area:
      {{ functionalArea }}
    </sw-tenant-engine-plugin>
  </sw-content-tab>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import Vue from "vue";
import { ITenantEngineConfiguration } from "sitewhere-rest-api";

@Component({})
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

  /** Mark as hanving unsaved updates */
  markDirty(): void {
    this.$emit("dirty");
  }
}
</script>

<style scoped></style>
