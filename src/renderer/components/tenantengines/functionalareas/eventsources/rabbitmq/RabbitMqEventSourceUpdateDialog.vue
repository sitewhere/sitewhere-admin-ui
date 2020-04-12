<template>
  <rabbit-mq-event-source-dialog
    ref="dialog"
    title="Update RabbitMQ Event Source"
    width="700"
    createLabel="Update"
    cancelLabel="Cancel"
    :idsInUse="idsInUse"
    :tenantId="tenantId"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import RabbitMqEventSourceDialog from "./RabbitMqEventSourceDialog.vue";

import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    RabbitMqEventSourceDialog,
  },
})
export default class RabbitMqEventSourceUpdateDialog extends Vue {
  @Prop() readonly tenantId!: string;

  /** References */
  $refs!: Refs<{
    dialog: RabbitMqEventSourceDialog;
  }>;

  originalId: string | null = null;
  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(config: IEventSourceGenericConfiguration): void {
    this.$refs.dialog.closeDialog();
    this.$emit("update", this.originalId, config);
  }

  /** Open dialog */
  openDialog(
    config: IEventSourceGenericConfiguration,
    idsInUse: string[]
  ): void {
    this.originalId = config.id;
    this.idsInUse = idsInUse;
    this.$refs.dialog.reset();
    this.$refs.dialog.openDialog();
    this.$refs.dialog.load(config);
  }
}
</script>

<style scoped></style>
