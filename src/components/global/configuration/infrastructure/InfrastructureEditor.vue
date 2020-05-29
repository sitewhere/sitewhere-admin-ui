<template>
  <instance-configuration-editor
    class="editor"
    :tabkey="tabkey"
    :configuration="configuration"
    header="Configure Connectivity to Instance Infrastructure"
  >
    <grpc-section :configuration="configuration" @updated="onGrpcUpdated" />
    <v-divider class="mt-6 mb-6" />
    <kafka-section :configuration="configuration" @updated="onKafkaUpdated" />
    <v-divider class="mt-6 mb-6" />
    <redis-section :configuration="configuration" @updated="onRedisUpdated" />
    <v-divider class="mt-6 mb-6" />
    <metrics-section :configuration="configuration" @updated="onMetricsUpdated" />
  </instance-configuration-editor>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import Vue from "vue";
import {
  IInstanceConfiguration,
  IGrpcConfiguration,
  IKafkaConfiguration,
  IRedisConfiguration,
  IMetricsConfiguration
} from "sitewhere-rest-api";

import InstanceConfigurationEditor from "../InstanceConfigurationEditor.vue";
import RedisSection from "./redis/RedisSection.vue";
import KafkaSection from "./kafka/KafkaSection.vue";
import GrpcSection from "./grpc/GrpcSection.vue";
import MetricsSection from "./metrics/MetricsSection.vue";

@Component({
  components: {
    InstanceConfigurationEditor,
    RedisSection,
    KafkaSection,
    GrpcSection,
    MetricsSection
  }
})
export default class InfrastructureEditor extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** Called when gRPC values are updated. */
  onGrpcUpdated(updated: IGrpcConfiguration) {
    if (this.configuration) {
      this.configuration.infrastructure.grpc = updated;
    }
    this.$emit("updated");
  }

  /** Called when Kafka values are updated. */
  onKafkaUpdated(updated: IKafkaConfiguration) {
    if (this.configuration) {
      this.configuration.infrastructure.kafka = updated;
    }
    this.$emit("updated");
  }
  /** Called when Redis values are updated. */
  onRedisUpdated(updated: IRedisConfiguration) {
    if (this.configuration) {
      this.configuration.infrastructure.redis = updated;
    }
    this.$emit("updated");
  }
  /** Called when metrics values are updated. */
  onMetricsUpdated(updated: IMetricsConfiguration) {
    if (this.configuration) {
      this.configuration.infrastructure.metrics = updated;
    }
    this.$emit("updated");
  }
}
</script>

<style scoped>
.editor {
  border-bottom: 1px solid #eee;
}
</style>
