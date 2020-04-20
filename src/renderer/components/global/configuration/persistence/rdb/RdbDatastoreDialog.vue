<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    :createLabel="createLabel"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <slot />
    <v-card color="#f5f5f5" flat class="pl-3 pr-3 pt-1">
      <v-select
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
    </v-card>
    <v-divider class="mb-2" />
    <postgres-95-fields v-if="isPostgres95" ref="details" />
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
  NavigationIcon
} from "sitewhere-ide-common";

import Postgres95Fields from "../../../../configuration/datastore/postgres95/Postgres95Fields.vue";

import {
  IDatastoreDefinition,
  IDatastoreDefinitionLocal
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { Postgres95Fields }
})
export default class RdbDatastoreDialog extends DialogComponent<
  IDatastoreDefinition
> {
  @Prop() readonly instance!: IInstanceConfiguration;
  @Prop() readonly title!: string;
  @Prop() readonly createLabel!: string;

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

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Datastore;
  }

  /** Indicates whether database is Postgres95 */
  get isPostgres95(): boolean {
    return this.type == "postgres95";
  }

  /** Generate payload from UI data */
  generatePayload(): IDatastoreDefinitionLocal {
    return {
      type: this.type,
      configuration: Object.assign(
        {},
        this.configuration,
        this.$refs.details.save()
      )
    };
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
    if (this.$refs.details) {
      this.$refs.details.load(this.configuration);
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
