<template>
  <datastore-dialog
    ref="dialog"
    title="Create Datastore"
    createLabel="Create"
    :instance="instance"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Refs, Prop } from "sitewhere-ide-common";

import DatastoreDialog from "./DatastoreDialog.vue";

import { IDatastoreDefinition } from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: {
    DatastoreDialog
  }
})
export default class CoapEventSourceCreateDialog extends Vue {
  @Prop() readonly instance!: IInstanceConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: DatastoreDialog;
  }>;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: IDatastoreDefinition): void {
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
