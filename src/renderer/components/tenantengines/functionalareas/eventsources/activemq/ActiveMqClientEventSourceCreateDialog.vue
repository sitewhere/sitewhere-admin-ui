<template>
  <active-mq-client-event-source-dialog
    ref="dialog"
    title="Create ActiveMQ Client Event Source"
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

import ActiveMqClientEventSourceDialog from "./ActiveMqClientEventSourceDialog.vue";

import { IActiveMqClientConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    ActiveMqClientEventSourceDialog
  }
})
export default class ActiveMqBrokerEventSourceCreateDialog extends Vue {
  /** References */
  $refs!: Refs<{
    dialog: ActiveMqClientEventSourceDialog;
  }>;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: IActiveMqClientConfiguration): void {
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
