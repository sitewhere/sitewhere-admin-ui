<template>
  <sw-dialog-form>
    <v-flex xs9>
      <sw-form-text
        required
        label="Hostname"
        title="Hostname used to determine bootstrap servers."
        v-model="hostname"
        icon="fa-cog"
        class="mr-3"
      ></sw-form-text>
    </v-flex>
    <v-flex xs3>
      <sw-form-text
        required
        label="Port"
        title="Port used for bootstrap servers."
        v-model="port"
        icon="fa-cog"
        type="number"
      ></sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        label="Default Topic Partitions"
        title="Default number of partitions created for new topics."
        v-model="defaultTopicPartitions"
        icon="fa-cog"
        type="number"
        class="mr-3"
      ></sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        label="Default Topic Replication Factor"
        title="Default replication factor for new topics."
        v-model="defaultTopicReplicationFactor"
        icon="fa-cog"
        type="number"
      ></sw-form-text>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import { IKafkaConfiguration } from "sitewhere-rest-api";

@Component({
  validations: {}
})
export default class KafkaConfigurationFields extends DialogSection {
  hostname: string | null = null;
  port: number | null = null;
  defaultTopicPartitions: number | null = null;
  defaultTopicReplicationFactor: number | null = null;

  /** Reset section content */
  reset(): void {
    this.hostname = null;
    this.port = null;
    this.defaultTopicPartitions = null;
    this.defaultTopicReplicationFactor = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(kafka: IKafkaConfiguration): void {
    this.hostname = kafka.hostname;
    this.port = kafka.port;
    this.defaultTopicPartitions = kafka.defaultTopicPartitions;
    this.defaultTopicReplicationFactor = kafka.defaultTopicReplicationFactor;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      hostname: this.hostname,
      port: this.port,
      defaultTopicPartitions: this.defaultTopicPartitions,
      defaultTopicReplicationFactor: this.defaultTopicReplicationFactor
    };
  }
}
</script>

<style scoped></style>
