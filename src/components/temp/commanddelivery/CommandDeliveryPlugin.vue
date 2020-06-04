<template>
  <tenant-engine-plugin :configuration="configuration">
    <command-destinations-table
      :tenantId="tenantId"
      :destinations="destinations"
      @create="onCommandDestinationCreated"
      @update="onCommandDestinationUpdated"
      @delete="onCommandDestinationDeleted"
    />
    <content-divider />
    <command-router-section
      :router="router"
      :destinations="destinations"
      @update="onCommandRouterUpdated"
      @unset="onUnsetCommandRouter"
    />
  </tenant-engine-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { MicroserviceIcon } from "sitewhere-ide-common";

import TenantEnginePlugin from "../TenantEnginePlugin.vue";
import CommandDestinationsTable from "./CommandDestinationsTable.vue";
import CommandRouterSection from "./CommandRouterSection.vue";
import { ContentDivider } from "sitewhere-ide-components";

import {
  ITenantEngineConfiguration,
  IInstanceConfiguration
} from "sitewhere-rest-api";
import {
  ICommandDeliveryConfiguration,
  ICommandDestinationGenericConfiguration,
  IRouterGenericConfiguration
} from "sitewhere-configuration-model";

@Component({
  components: {
    TenantEnginePlugin,
    CommandDestinationsTable,
    CommandRouterSection,
    ContentDivider
  }
})
export default class CommandDeliveryPlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Tenant id */
  get tenantId(): string | null {
    return this.configuration ? this.configuration.tenant.token : null;
  }

  /** Get tenant configuration for command delivery */
  get commandDeliveryConfiguration(): ICommandDeliveryConfiguration {
    return this.configuration ? this.configuration.tenantConfiguration : null;
  }

  /** Get instance configuraton information */
  get instanceManagement(): IInstanceConfiguration | null {
    return this.configuration ? this.configuration.instanceConfiguration : null;
  }

  /** Get command destinations list */
  get destinations(): ICommandDestinationGenericConfiguration[] | null {
    return this.commandDeliveryConfiguration
      ? this.commandDeliveryConfiguration.commandDestinations
      : null;
  }

  /** Get configured router */
  get router(): IRouterGenericConfiguration | null {
    return this.commandDeliveryConfiguration
      ? this.commandDeliveryConfiguration.router
      : null;
  }

  /** Handle command destination created */
  onCommandDestinationCreated(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    config: ICommandDestinationGenericConfiguration
  ): void {
    this.markDirty();
  }

  /** Handle command destination updated */
  onCommandDestinationUpdated(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    originalId: string,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    config: ICommandDestinationGenericConfiguration
  ): void {
    this.markDirty();
  }

  /** Handle command destination deleted */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onCommandDestinationDeleted(id: string): void {
    this.markDirty();
  }

  /** Handle command router updated */
  onCommandRouterUpdated(): void {
    this.markDirty();
  }

  /** Handle unsetting router */
  onUnsetCommandRouter(): void {
    if (this.commandDeliveryConfiguration) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (this.commandDeliveryConfiguration as any).router = null;
    }
    this.markDirty();
  }

  /** Mark data as having been updated */
  markDirty(): void {
    this.$emit("dirty");
  }
}
</script>
