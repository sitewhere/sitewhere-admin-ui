<template>
  <coap-event-source-dialog
    ref="dialog"
    title="Create CoAP Server Event Source"
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

import CoapEventSourceDialog from "./CoapEventSourceDialog.vue";

import { ICoapServerConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    CoapEventSourceDialog
  }
})
export default class CoapEventSourceCreateDialog extends Vue {
  /** References */
  $refs!: Refs<{
    dialog: CoapEventSourceDialog;
  }>;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: ICoapServerConfiguration): void {
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
