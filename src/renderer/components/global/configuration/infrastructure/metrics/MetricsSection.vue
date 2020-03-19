<template>
  <sw-content-section icon="fa-cogs" title="Metrics Configuration">
    <v-card v-if="metrics" flat>
      <sw-content-field name="enabled" :value="metrics.enabled" />
      <sw-content-field
        :alt="true"
        name="http port"
        :value="metrics.httpPort"
      />
      <sw-content-link
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
  </sw-content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import MetricsConfigurationDialog from "./MetricsConfigurationDialog.vue";

import {
  IInstanceConfiguration,
  IInfrastructureConfiguration,
  IMetricsConfiguration
} from "sitewhere-rest-api";

@Component({
  components: {
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
