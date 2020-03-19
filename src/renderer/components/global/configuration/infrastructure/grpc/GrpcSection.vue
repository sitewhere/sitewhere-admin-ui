<template>
  <sw-content-section icon="fa-cogs" title="gRPC Configuration">
    <template slot="overlay"><div class="logo"/></template>
    <v-card v-if="grpc" flat>
      <sw-content-field name="max retry count" :value="grpc.maxRetryCount" />
      <sw-content-field
        :alt="true"
        name="initial backoff seconds"
        :value="grpc.initialBackoffSeconds"
      />
      <sw-content-field
        name="max backoff seconds"
        :value="grpc.maxBackoffSeconds"
      />
      <sw-content-field
        :alt="true"
        name="backoff multiplier"
        :value="grpc.backoffMultiplier"
      />
      <sw-content-field name="resolve fqdn" :value="grpc.resolveFQDN" />
      <sw-content-link
        class="mt-3"
        icon="fa-edit"
        text="Edit gRPC configuration."
        @linkClicked="onEdit"
      />
    </v-card>
    <grpc-configuration-dialog
      ref="dialog"
      :grpc="grpc"
      @payload="onGrpcUpdated"
    />
  </sw-content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import GrpcConfigurationDialog from "./GrpcConfigurationDialog.vue";

import {
  IInstanceConfiguration,
  IInfrastructureConfiguration,
  IGrpcConfiguration
} from "sitewhere-rest-api";

@Component({
  components: {
    GrpcConfigurationDialog
  }
})
export default class KafkaSection extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;

  // References.
  $refs!: Refs<{
    dialog: GrpcConfigurationDialog;
  }>;

  /** Get infrastructure information */
  get infrastructure(): IInfrastructureConfiguration | null {
    return this.configuration ? this.configuration.infrastructure : null;
  }

  /** Get gRPC configuration */
  get grpc(): IGrpcConfiguration | null {
    return this.infrastructure ? this.infrastructure.grpc : null;
  }

  /** Called to edit gRPC configuration */
  onEdit(): void {
    if (this.grpc) {
      this.$refs.dialog.load(this.grpc);
      this.$refs.dialog.openDialog();
    }
  }

  /** Called after gRPC values are updated */
  onGrpcUpdated(updated: IGrpcConfiguration): void {
    this.$emit("updated", updated);
  }
}
</script>

<style scoped>
.logo {
  position: absolute;
  top: 60px;
  right: 100px;
  width: 150px;
  height: 150px;
  background-image: url("../../../../../assets/grpc.png");
  background-size: contain;
  opacity: 0.8;
}
</style>
