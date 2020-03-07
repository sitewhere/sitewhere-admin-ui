<template>
  <div>
    <v-card flat v-if="datastore">
      <v-card flat class="mb-3" v-if="datastoreReference">
        <v-icon small class="mr-2">fa-globe</v-icon>Configured globally as
        <a style="color: #2255cc;">{{ datastoreReference }}</a
        >.
      </v-card>
      <postgres-95-summary v-if="isPostgres95" :configuration="configuration" />
      <content-link
        class="mt-3"
        icon="fa-edit"
        text="Update datastore settings"
        @linkClicked="onUpdateDatastore"
      />
      <content-link
        icon="fa-trash"
        text="Unset datastore"
        @linkClicked="onUnsetDatastore"
      />
    </v-card>
    <v-card flat v-else>
      <content-warning
        text="No datastore is set. This will cause
    tenant engine startup to fail!"
      />
      <content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add datastore information."
        @linkClicked="onAddDatastore"
      />
    </v-card>
    <datastore-dialog :instance="instance" ref="dialog" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";
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

import DatastoreDialog from "./datastore/DatastoreDialog.vue";
import Postgres95Summary from "./datastore/postgres95/Postgres95Summary.vue";

import ContentField from "./ContentField.vue";
import ContentLink from "./ContentLink.vue";
import ContentWarning from "./ContentWarning.vue";

@Component({
  components: {
    ContentField,
    ContentLink,
    ContentWarning,
    DatastoreDialog,
    Postgres95Summary
  }
})
export default class DatastoreSelector extends Vue {
  @Prop() readonly datastore!: IDatastoreDefinition;
  @Prop() readonly instance!: IInstanceConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: DatastoreDialog;
  }>;

  /** Global RDB configurations */
  get rdbConfigurations(): IRdbConfigurationMap | null {
    return this.instance && this.instance.persistenceConfigurations
      ? this.instance.persistenceConfigurations.rdbConfigurations
      : null;
  }

  /** Get reference name */
  get datastoreReference(): string | null {
    return this.datastore
      ? (this.datastore as IDatastoreDefinitionReference).reference
      : null;
  }

  /** Local or global datastore type */
  get datastoreType(): string | null {
    let reference = this.datastoreReference;
    if (reference) {
      let global: IDatastoreDefinition | null = this.findGlobalDefinition(
        reference
      );
      return global ? global.type : null;
    }
    return this.datastore
      ? (this.datastore as IDatastoreDefinitionLocal).type
      : null;
  }

  /** Local or global datastore configuration */
  get configuration(): any {
    let reference = this.datastoreReference;
    if (reference) {
      let global: IDatastoreDefinition | null = this.findGlobalDefinition(
        reference
      );
      return global ? global.configuration : null;
    }
    return this.datastore
      ? (this.datastore as IDatastoreDefinitionLocal).configuration
      : null;
  }

  /** Postgres95 datastore */
  get isPostgres95(): boolean {
    return this.datastoreType ? this.datastoreType == "postgres95" : false;
  }

  /** Find a referenced persistence configuration */
  findGlobalDefinition(reference: string): IDatastoreDefinitionLocal | null {
    if (!this.rdbConfigurations) {
      return null;
    }
    let match: IRdbConfiguration = this.rdbConfigurations[reference];
    if (!match) {
      return null;
    }
    return {
      type: match.type,
      configuration: match.configuration
    };
  }

  /** Add datastore */
  onAddDatastore() {
    console.log("Add datastore.");
  }

  /** Update datastore */
  onUpdateDatastore() {
    this.$refs.dialog.load(this.datastore);
    this.$refs.dialog.openDialog();
  }

  /** Unset datastore */
  onUnsetDatastore() {
    this.$emit("unsetDatastore");
  }
}
</script>

<style scoped></style>
