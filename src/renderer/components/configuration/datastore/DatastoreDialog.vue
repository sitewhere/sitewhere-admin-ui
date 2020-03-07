<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Configure Datastore"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Save"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <v-card color="#f5f5f5" flat class="pl-3 pr-3 pt-1">
      <v-layout class="pl-2 pr-2 pt-0 pb-0" row wrap>
        <v-flex xs4
          ><v-btn-toggle class="mt-3" v-model="scope">
            <v-btn flat>
              Local
            </v-btn>
            <v-btn flat>
              Global
            </v-btn></v-btn-toggle
          >
        </v-flex>
        <v-flex xs8 v-if="isLocalScope">
          <v-select
            class="ml-3"
            :required="true"
            title="Choose database type"
            label="Database Type"
            :items="databaseTypes"
            v-model="type"
            item-text="text"
            item-value="value"
            prepend-icon="fa-database"
            placeholder=" "
          />
        </v-flex>
        <v-flex xs8 v-else>
          <v-select
            class="ml-3"
            :required="true"
            title="Choose global database reference"
            label="Global Reference"
            :items="globalDatabases"
            v-model="reference"
            item-text="text"
            item-value="value"
            prepend-icon="fa-database"
            placeholder=" "
          />
        </v-flex>
      </v-layout>
    </v-card>
    <v-divider class="mb-2" />
    <postgres-95-fields
      v-if="isPostgres95"
      :readonly="isGlobalScope"
      ref="details"
    />
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs,
  Prop,
  Watch
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../../libraries/constants";

import DialogForm from "../../common/form/DialogForm.vue";
import FormSelect from "../../common/form/FormSelect.vue";
import Postgres95Fields from "./postgres95/Postgres95Fields.vue";

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
  components: { DialogForm, FormSelect, Postgres95Fields }
})
export default class DatastoreDialog extends DialogComponent<
  IDatastoreDefinition
> {
  @Prop() readonly instance!: IInstanceConfiguration;

  scope: number = 0;
  reference: string | null = null;
  type: string = "postgres95";
  configuration: any;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DialogSection;
  }>;

  /** List of supported database types */
  databaseTypes: { text: string; value: string }[] = [
    {
      text: "PostgreSQL",
      value: "postgres95"
    }
  ];

  @Watch("scope")
  onScopeChanged(updated: number) {
    if (!this.isLocalScope) {
      console.trace("Saving configuration", this.generatePayload());
      this.configuration = this.generatePayload();
    }
    this.reloadDetails();
  }

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Datastore;
  }

  /** Indicates if local scope is chosen */
  get isLocalScope(): boolean {
    return this.scope == 0;
  }

  /** Indicates if global scope is chosen */
  get isGlobalScope(): boolean {
    return this.scope == 1;
  }

  /** Global RDB configurations */
  get rdbConfigurations(): IRdbConfigurationMap | null {
    return this.instance && this.instance.persistenceConfigurations
      ? this.instance.persistenceConfigurations.rdbConfigurations
      : null;
  }

  /** Get list of available global databases */
  get globalDatabases(): { text: string; value: string }[] {
    let databases: { text: string; value: string }[] = [];
    if (this.rdbConfigurations) {
      let keys: string[] = Object.keys(this.rdbConfigurations);
      keys.forEach(key => {
        databases.push({ text: key, value: key });
      });
    }
    return databases;
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

  /** Local or global datastore type */
  get datastoreType(): string | null {
    if (!this.isLocalScope && this.reference) {
      let global: IDatastoreDefinition | null = this.findGlobalDefinition(
        this.reference
      );
      return global ? global.type : null;
    }
    return this.type;
  }

  /** Local or global datastore configuration */
  get datastoreConfiguration(): any {
    if (!this.isLocalScope && this.reference) {
      let global: IDatastoreDefinition | null = this.findGlobalDefinition(
        this.reference
      );
      console.log("Returning global config", global);
      return global ? global.configuration : null;
    }
    console.log("Returning local config", this.configuration);
    return this.configuration;
  }

  /** Indicates whether database is Postgres95 */
  get isPostgres95(): boolean {
    return this.datastoreType == "postgres95";
  }

  /** Generate payload from UI data */
  generatePayload() {
    let payload: any = {};
    Object.assign(payload, this.$refs.details.save());
    return payload;
  }

  /** Reset dialog content to default */
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  /** Load data from an existing configuration */
  load(payload: IDatastoreDefinition) {
    this.reset();
    this.type = (payload as IDatastoreDefinitionLocal).type || "postgres95";
    this.configuration =
      (payload as IDatastoreDefinitionLocal).configuration || {};
    this.reference = (payload as IDatastoreDefinitionReference).reference;
    this.scope = this.reference ? 1 : 0;
    this.reloadDetails();
  }

  /** Reload details panel based on updated configuration */
  reloadDetails() {
    if (this.$refs.details && this.datastoreConfiguration) {
      this.$refs.details.load(this.datastoreConfiguration);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>

<style scoped></style>
