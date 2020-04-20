<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Metrics Configuration"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <metrics-configuration-fields ref="details" />
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  Refs,
  Prop,
  DialogComponent,
  NavigationIcon
} from "sitewhere-ide-common";

import MetricsConfigurationFields from "./MetricsConfigurationFields.vue";

import { IMetricsConfiguration } from "sitewhere-rest-api";

@Component({
  components: { MetricsConfigurationFields }
})
export default class MetricsConfigurationDialog extends DialogComponent<
  IMetricsConfiguration
> {
  @Prop() readonly metrics!: IMetricsConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: any;
    details: MetricsConfigurationFields;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IMetricsConfiguration {
    return Object.assign({}, this.metrics, this.$refs.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IMetricsConfiguration) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
  }

  /** Called after update button is clicked */
  onUpdateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
    this.dialogVisible = false;
  }
}
</script>

<style scoped></style>
