<template>
  <sw-dialog-form>
    <v-flex xs6>
      <sw-form-text
        required
        label="Max Retry Count"
        title="Max number of retries when establishing gRPC connection."
        v-model="maxRetryCount"
        icon="fa-cog"
        type="number"
        class="mr-3"
      ></sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        label="Initial Backoff in Seconds"
        title="Initial backoff period in seconds."
        v-model="initialBackoffSeconds"
        icon="fa-cog"
        type="number"
        class="mr-3"
      ></sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        label="Max Backoff Seconds"
        title="Maximum backoff time in seconds."
        v-model="maxBackoffSeconds"
        icon="fa-cog"
        type="number"
        class="mr-3"
      ></sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        label="Backoff Multiplier"
        title="Mulitplier used to increase backoff for retries."
        v-model="backoffMultiplier"
        icon="fa-cog"
        type="number"
        class="mr-3"
      ></sw-form-text>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import { IGrpcConfiguration } from "sitewhere-rest-api";

@Component({
  validations: {}
})
export default class GrpcConfigurationFields extends DialogSection {
  maxRetryCount: number | null = null;
  initialBackoffSeconds: number | null = null;
  maxBackoffSeconds: number | null = null;
  backoffMultiplier: number | null = null;
  resolveFQDN: boolean = true;

  /** Reset section content */
  reset(): void {
    this.maxRetryCount = null;
    this.initialBackoffSeconds = null;
    this.maxBackoffSeconds = null;
    this.backoffMultiplier = null;
    this.resolveFQDN = true;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(grpc: IGrpcConfiguration): void {
    this.maxRetryCount = grpc.maxRetryCount;
    this.initialBackoffSeconds = grpc.initialBackoffSeconds;
    this.maxBackoffSeconds = grpc.maxBackoffSeconds;
    this.backoffMultiplier = grpc.backoffMultiplier;
    this.resolveFQDN = grpc.resolveFQDN;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      maxRetryCount: this.maxRetryCount,
      initialBackoffSeconds: this.initialBackoffSeconds,
      maxBackoffSeconds: this.maxBackoffSeconds,
      backoffMultiplier: this.backoffMultiplier,
      resolveFQDN: this.resolveFQDN
    };
  }
}
</script>

<style scoped></style>
