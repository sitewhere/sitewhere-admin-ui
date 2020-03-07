<template>
  <content-section icon="fa-cogs" title="Metrics Configuration">
    <v-card v-if="metrics" flat>
      <content-field name="enabled" :value="metrics.enabled" />
      <content-field :alt="true" name="http port" :value="metrics.httpPort" />
      <content-link
        class="mt-3"
        icon="fa-edit"
        text="Edit metrics configuration."
        @linkClicked="onEdit"
      />
    </v-card>
    <metrics-configuration-dialog
      ref="dialog"
      :metrics="metrics"
      @payload="onMetricsUpdated"
    />
  </content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import ContentSection from "../../../../configuration/ContentSection.vue";
import ContentField from "../../../../configuration/ContentField.vue";
import ContentLink from "../../../../configuration/ContentLink.vue";
import MetricsConfigurationDialog from "./MetricsConfigurationDialog.vue";

import { ITenantEngineConfiguration } from "sitewhere-rest-api";
import {
  IDeviceManagementConfiguration,
  IDatastoreDefinition
} from "sitewhere-configuration-model";
import {
  IInstanceConfiguration,
  IInfrastructureConfiguration,
  IMetricsConfiguration
} from "sitewhere-rest-api";

@Component({
  components: {
    ContentSection,
    ContentField,
    ContentLink,
    MetricsConfigurationDialog
  }
})
export default class RedisSection extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: MetricsConfigurationDialog;
  }>;

  /** Get infrastructure information */
  get infrastructure(): IInfrastructureConfiguration | null {
    return this.configuration ? this.configuration.infrastructure : null;
  }

  /** Get metrics configuration */
  get metrics(): IMetricsConfiguration | null {
    return this.infrastructure ? this.infrastructure.metrics : null;
  }

  /** Called to edit Kafka configuration */
  onEdit(): void {
    if (this.metrics) {
      this.$refs.dialog.load(this.metrics);
      this.$refs.dialog.openDialog();
    }
  }

  /** Called after metrics values are updated */
  onMetricsUpdated(updated: IMetricsConfiguration): void {
    this.$emit("updated", updated);
  }
}
</script>

<style scoped></style>
