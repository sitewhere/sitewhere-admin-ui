<template>
  <ts-datastore-dialog
    ref="dialog"
    title="Update Time Series Datastore"
    createLabel="Update"
    @payload="onUpdateClicked"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref, Prop } from "vue-property-decorator";

import TsDatastoreDialog from "./TsDatastoreDialog.vue";

import {
  IDatastoreDefinition,
  IDatastoreDefinitionLocal
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { TsDatastoreDialog }
})
export default class TsDatastoreUpdateDialog extends Vue {
  @Prop() readonly instance!: IInstanceConfiguration;
  @Ref() readonly dialog!: TsDatastoreDialog;

  type: string | null = null;
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
