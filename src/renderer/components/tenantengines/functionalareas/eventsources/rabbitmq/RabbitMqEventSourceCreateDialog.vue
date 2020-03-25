<template>
  <rabbit-mq-event-source-dialog
    ref="dialog"
    title="Create RabbitMQ Event Source"
    width="700"
    createLabel="Create"
    cancelLabel="Cancel"
    :idsInUse="idsInUse"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Refs } from "sitewhere-ide-common";

import RabbitMqEventSourceDialog from "./RabbitMqEventSourceDialog.vue";

import { IRabbitMqConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    RabbitMqEventSourceDialog
  }
})
export default class RabbitMqEventSourceCreateDialog extends Vue {
  /** References */
  $refs!: Refs<{
    dialog: RabbitMqEventSourceDialog;
  }>;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: IRabbitMqConfiguration): void {
    this.$refs.dialog.closeDialog();
    this.$emit("create", payload);
  }

  /** Open dialog */
  openDialog(idsInUse: string[]): void {
    this.idsInUse = idsInUse;
    this.$refs.dialog.reset();
    this.$refs.dialog.openDialog();
  }
}
</script>

<style scoped></style>
