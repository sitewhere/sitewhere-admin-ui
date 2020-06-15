<template>
  <content-tab :tabkey="tabkey" :loaded="true" loadingMessage="Loading...">
    <asset-management-plugin
      :configuration="configuration"
      v-if="functionalArea == 'asset-management'"
      @dirty="markDirty"
    />
    <batch-operations-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'batch-operations'"
      @dirty="markDirty"
    />
    <command-delivery-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'command-delivery'"
      @dirty="markDirty"
    />
    <device-registration-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'device-registration'"
      @dirty="markDirty"
    />
    <device-management-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'device-management'"
      @dirty="markDirty"
    />
    <device-state-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'device-state'"
      @dirty="markDirty"
    />
    <event-management-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'event-management'"
      @dirty="markDirty"
    />
    <event-sources-plugin
      :configuration="configuration"
      v-else-if="functionalArea == 'event-sources'"
      @dirty="markDirty"
    />
    <tenant-engine-plugin v-else :configuration="configuration">
      No Plugin Found for Functional Area:
      {{ functionalArea }}
    </tenant-engine-plugin>
  </content-tab>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { ContentTab } from "sitewhere-ide-components";
import {
  AssetManagementPlugin,
  BatchOperationsPlugin,
  CommandDeliveryPlugin,
  DeviceManagementPlugin,
  DeviceRegistrationPlugin,
  DeviceStatePlugin,
  EventManagementPlugin,
  EventSourcesPlugin,
  TenantEnginePlugin
} from "sitewhere-admin-ui-plugins";
import { ITenantEngineConfiguration } from "sitewhere-rest-api";

@Component({
  components: {
    ContentTab,
    AssetManagementPlugin,
    BatchOperationsPlugin,
    CommandDeliveryPlugin,
    DeviceManagementPlugin,
    DeviceRegistrationPlugin,
    DeviceStatePlugin,
    EventManagementPlugin,
    EventSourcesPlugin,
    TenantEnginePlugin
  }
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

  /** Mark as hanving unsaved updates */
  markDirty(): void {
    this.$emit("dirty");
  }
}
</script>
