<template>
  <rdb-datastore-dialog
    ref="dialog"
    title="Update Relational Datastore"
    createLabel="Update"
    @payload="onUpdateClicked"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref, Prop } from "vue-property-decorator";

import RdbDatastoreDialog from "./RdbDatastoreDialog.vue";

import {
  IDatastoreDefinition,
  IDatastoreDefinitionLocal
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { RdbDatastoreDialog }
})
export default class RdbDatastoreUpdateDialog extends Vue {
  @Prop() readonly instance!: IInstanceConfiguration;
  @Ref() readonly dialog!: RdbDatastoreDialog;

  type = "postgres95";
  configuration: any;

  /** Load dialog with data */
  load(payload: IDatastoreDefinition) {
    this.type = (payload as IDatastoreDefinitionLocal).type;
    this.configuration = (payload as IDatastoreDefinitionLocal).configuration;
    this.dialog.load(payload);
  }

  /** Open the dialog */
  openDialog(): void {
    this.dialog.openDialog();
  }

  /** Called when update button is clicked */
  onUpdateClicked(payload: IDatastoreDefinitionLocal): void {
    this.type = payload.type;
    this.configuration = payload.configuration;
    this.$emit("updated", payload);
    this.dialog.dialogVisible = false;
  }
}
</script>

<style scoped></style>
