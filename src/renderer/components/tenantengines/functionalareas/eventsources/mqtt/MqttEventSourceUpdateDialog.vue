<template>
  <mqtt-event-source-dialog
    ref="dialog"
    title="Update MQTT Event Source"
    width="700"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Refs } from "sitewhere-ide-common";

import MqttEventSourceDialog from "./MqttEventSourceDialog.vue";

import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    MqttEventSourceDialog
  }
})
export default class MqttEventSourceUpdateDialog extends Vue {
  /** References */
  $refs!: Refs<{
    dialog: MqttEventSourceDialog;
  }>;

  /** Emit payload */
  onPayload(config: IEventSourceGenericConfiguration): void {
    this.$refs.dialog.closeDialog();
    this.$emit("update", config);
  }

  /** Open dialog */
  openDialog(config: IEventSourceGenericConfiguration): void {
    this.$refs.dialog.reset();
    this.$refs.dialog.openDialog();
    this.$refs.dialog.load(config);
  }
}
</script>

<style scoped></style>
