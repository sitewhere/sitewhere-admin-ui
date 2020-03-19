<template>
  <mqtt-event-source-dialog
    ref="dialog"
    title="Create MQTT Event Source"
    width="700"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Refs } from "sitewhere-ide-common";

import MqttEventSourceDialog from "./MqttEventSourceDialog.vue";

import { IMqttEventSourceConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    MqttEventSourceDialog
  }
})
export default class MqttEventSourceCreateDialog extends Vue {
  /** References */
  $refs!: Refs<{
    dialog: MqttEventSourceDialog;
  }>;

  /** Emit payload */
  onPayload(payload: IMqttEventSourceConfiguration): void {
    this.$refs.dialog.closeDialog();
    this.$emit("create", payload);
  }

  /** Open dialog */
  openDialog(): void {
    this.$refs.dialog.reset();
    this.$refs.dialog.openDialog();
  }
}
</script>

<style scoped></style>
