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
import { Component, Refs, Prop } from "sitewhere-ide-common";

import RdbDatastoreDialog from "./RdbDatastoreDialog.vue";

import {
  IDatastoreDefinition,
  IDatastoreDefinitionLocal,
  IDatastoreDefinitionReference
} from "sitewhere-configuration-model";
import {
  IInstanceConfiguration,
  IRdbConfigurationMap,
  IRdbConfiguration
} from "sitewhere-rest-api";

@Component({
  components: { RdbDatastoreDialog }
})
export default class RdbDatastoreUpdateDialog extends Vue {
  @Prop() readonly instance!: IInstanceConfiguration;

  type: string = "postgres95";
  configuration: any;

  // References.
  $refs!: Refs<{
    dialog: RdbDatastoreDialog;
  }>;

  /** Load dialog with data */
  load(payload: IDatastoreDefinition) {
    this.type = (payload as IDatastoreDefinitionLocal).type;
    this.configuration = (payload as IDatastoreDefinitionLocal).configuration;
    this.$refs.dialog.load(payload);
  }

  /** Open the dialog */
  openDialog(): void {
    this.$refs.dialog.openDialog();
  }

  /** Called when update button is clicked */
  onUpdateClicked(payload: IDatastoreDefinitionLocal): void {
    this.type = payload.type;
    this.configuration = payload.configuration;
    this.$emit("updated", payload);
  }
}
</script>

<style scoped></style>
