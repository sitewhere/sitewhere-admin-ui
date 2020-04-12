<template>
  <active-mq-broker-event-source-dialog
    ref="dialog"
    title="Create ActiveMQ Broker Event Source"
    width="700"
    createLabel="Create"
    cancelLabel="Cancel"
    :idsInUse="idsInUse"
    :tenantId="tenantId"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import ActiveMqBrokerEventSourceDialog from "./ActiveMqBrokerEventSourceDialog.vue";

import { IActiveMqBrokerConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    ActiveMqBrokerEventSourceDialog,
  },
})
export default class ActiveMqBrokerEventSourceCreateDialog extends Vue {
  @Prop() readonly tenantId!: string;

  /** References */
  $refs!: Refs<{
    dialog: ActiveMqBrokerEventSourceDialog;
  }>;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: IActiveMqBrokerConfiguration): void {
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
