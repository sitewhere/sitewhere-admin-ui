<template>
  <active-mq-client-event-source-dialog
    ref="dialog"
    title="Update ActiveMQ Client Event Source"
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

import ActiveMqClientEventSourceDialog from "./ActiveMqClientEventSourceDialog.vue";

import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    ActiveMqClientEventSourceDialog,
  },
})
export default class ActiveMqClientEventSourceUpdateDialog extends Vue {
  @Prop() readonly tenantId!: string;

  /** References */
  $refs!: Refs<{
    dialog: ActiveMqClientEventSourceDialog;
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
