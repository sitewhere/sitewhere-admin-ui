<template>
  <datastore-dialog
    ref="dialog"
    title="Update Datastore"
    createLabel="Update"
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
export default class CoapEventSourceUpdateDialog extends Vue {
  @Prop() readonly instance!: IInstanceConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: DatastoreDialog;
  }>;

  /** Emit payload */
  onPayload(definition: IDatastoreDefinition): void {
    this.$refs.dialog.closeDialog();
    this.$emit("update", definition);
  }

  /** Open dialog */
  openDialog(definition: IDatastoreDefinition): void {
    this.$refs.dialog.openDialog();
    this.$refs.dialog.load(definition);
  }
}
</script>

<style scoped></style>
