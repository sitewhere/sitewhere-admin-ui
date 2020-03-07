<template>
  <instance-configuration-editor
    class="editor"
    :tabkey="tabkey"
    :configuration="configuration"
    header="Configure Connectivity to Instance Infrastructure"
  >
    <grpc-section :configuration="configuration" @updated="onGrpcUpdated" />
    <v-divider class="mt-4 mb-4" />
    <kafka-section :configuration="configuration" />
    <v-divider class="mt-4 mb-4" />
    <redis-section :configuration="configuration" />
    <v-divider class="mt-4 mb-4" />
    <metrics-section :configuration="configuration" />
  </instance-configuration-editor>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import Vue from "vue";
import { IInstanceConfiguration } from "sitewhere-rest-api";

import InstanceConfigurationEditor from "../InstanceConfigurationEditor.vue";
import RedisSection from "./redis/RedisSection.vue";
import KafkaSection from "./kafka/KafkaSection.vue";
import GrpcSection from "./grpc/GrpcSection.vue";
import MetricsSection from "./metrics/MetricsSection.vue";
import { IGrpcConfiguration } from "../../../../../../../sitewhere-rest-api/src";

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
    console.log("gRPC values updated");
  }
}
</script>

<style scoped>
.editor {
  border-bottom: 1px solid #eee;
}
</style>
