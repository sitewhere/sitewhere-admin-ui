<template>
  <tenant-engine-plugin :configuration="configuration">
    <event-sources-table
      :tenantId="tenantId"
      :eventSources="eventSources"
      @create="onEventSourceCreated"
      @update="onEventSourceUpdated"
      @delete="onEventSourceDeleted"
    />
  </tenant-engine-plugin>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import TenantEnginePlugin from "../../common/TenantEnginePlugin.vue";
import EventSourcesTable from "./EventSourcesTable.vue";

import { MicroserviceIcon } from "../../../../libraries/constants";
import { ITenantEngineConfiguration } from "sitewhere-rest-api";
import {
  IEventSourcesConfiguration,
  IEventSourceGenericConfiguration,
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { TenantEnginePlugin, EventSourcesTable },
})
export default class EventSourcesPlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Tenant id */
  get tenantId(): string | null {
    return this.configuration ? this.configuration.tenant.token : null;
  }

  /** Get tenant configuration for event sources */
  get eventSourcesConfiguration(): IEventSourcesConfiguration {
    return this.configuration ? this.configuration.tenantConfiguration : null;
  }

  /** Get instance configuraton information */
  get instanceManagement(): IInstanceConfiguration | null {
    return this.configuration ? this.configuration.instanceConfiguration : null;
  }

  /** Get event sources list */
  get eventSources(): IEventSourceGenericConfiguration[] | null {
    return this.eventSourcesConfiguration
      ? this.eventSourcesConfiguration.eventSources
      : null;
  }

  /** Handle event source created */
  onEventSourceCreated(config: IEventSourceGenericConfiguration): void {
    this.markDirty();
  }

  /** Handle event source updated */
  onEventSourceUpdated(
    originalId: string,
    config: IEventSourceGenericConfiguration
  ): void {
    this.markDirty();
  }

  /** Handle event source deleted */
  onEventSourceDeleted(id: string): void {
    this.markDirty();
  }

  /** Mark data as having been updated */
  markDirty(): void {
    this.$emit("dirty");
  }
}
</script>

<style scoped></style>
