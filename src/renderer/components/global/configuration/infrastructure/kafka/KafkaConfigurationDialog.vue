<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Kafka Configuration"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <kafka-configuration-fields ref="details" />
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

import KafkaConfigurationFields from "./KafkaConfigurationFields.vue";

import { IKafkaConfiguration } from "sitewhere-rest-api";

@Component({
  components: { KafkaConfigurationFields }
})
export default class KafkaConfigurationDialog extends DialogComponent<
  IKafkaConfiguration
> {
  @Prop() readonly kafka!: IKafkaConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: any;
    details: KafkaConfigurationFields;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IKafkaConfiguration {
    return Object.assign({}, this.kafka, this.$refs.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IKafkaConfiguration) {
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
