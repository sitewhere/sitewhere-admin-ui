<template>
  <sw-dialog-form>
    <v-flex xs9>
      <sw-form-text
        required
        label="Enabled"
        title="Flag for enabling microservice metrics."
        v-model="enabled"
        icon="fa-cog"
        class="mr-3"
      ></sw-form-text>
    </v-flex>
    <v-flex xs3>
      <sw-form-text
        required
        label="HTTP Port"
        title="HTTP port which serves Prometheus metrics."
        v-model="httpPort"
        icon="fa-cog"
        type="number"
      ></sw-form-text>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import { IMetricsConfiguration } from "sitewhere-rest-api";

@Component({
  validations: {}
})
export default class MetricsConfigurationFields extends DialogSection {
  enabled = true;
  httpPort: number | null = null;

  /** Reset section content */
  reset(): void {
    this.enabled = true;
    this.httpPort = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(metrics: IMetricsConfiguration): void {
    this.enabled = metrics.enabled;
    this.httpPort = metrics.httpPort;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      enabled: this.enabled,
      httpPort: this.httpPort
    };
  }
}
</script>

<style scoped></style>
