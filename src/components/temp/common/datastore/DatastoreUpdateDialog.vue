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
import { Component, Ref, Prop } from "vue-property-decorator";

import DatastoreDialog from "./DatastoreDialog.vue";

import { IDatastoreDefinition } from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: {
    DatastoreDialog
  }
})
export default class DatastoreUpdateDialog extends Vue {
  @Prop() readonly instance!: IInstanceConfiguration;
  @Ref() readonly dialog!: DatastoreDialog;

  /** Emit payload */
  onPayload(definition: IDatastoreDefinition): void {
    this.dialog.closeDialog();
    this.$emit("update", definition);
  }

  /** Open dialog */
  openDialog(definition: IDatastoreDefinition): void {
    console.log("updating from", definition);
    this.dialog.openDialog();
    this.dialog.load(definition);
  }
}
</script>

