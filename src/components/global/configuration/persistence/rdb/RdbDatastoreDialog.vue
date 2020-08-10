<template>
  <base-dialog
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
    <postgres-95-fields v-show="isPostgres95" ref="postgres95" />
    <no-fields v-show="isUnknown" ref="unknown" />
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  DialogComponent,
  DialogSection,
  DialogHeader,
  BaseDialog
} from "sitewhere-ide-components";

import { Postgres95Fields, NoFields } from "sitewhere-admin-ui-plugins";

import {
  IDatastoreDefinition,
  IDatastoreDefinitionLocal
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { BaseDialog, DialogHeader, Postgres95Fields, NoFields }
})
export default class RdbDatastoreDialog extends DialogComponent<
  IDatastoreDefinition
> {
  @Prop() readonly instance!: IInstanceConfiguration;
  @Prop() readonly title!: string;
  @Prop() readonly createLabel!: string;
  @Ref() readonly dialog!: ITabbedComponent;

  @Ref() readonly postgres95!: Postgres95Fields;
  @Ref() readonly unknown!: NoFields;

  type = "postgres95";
  configuration: any;

  /** List of supported database types */
  databaseTypes: { text: string; value: string }[] = [
    {
      text: "PostgreSQL",
      value: "postgres95"
    }
  ];

  /** Get displayed summary panel */
  get details(): DialogSection {
    if (this.isPostgres95) {
      return this.postgres95;
    } else {
      return this.unknown;
    }
  }

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Datastore;
  }

  /** Indicates whether database is Postgres95 */
  get isPostgres95(): boolean {
    return this.type == "postgres95";
  }

  /** Indicates whether database is unknown */
  get isUnknown(): boolean {
    return !this.isPostgres95;
  }

  /** Generate payload from UI data */
  generatePayload(): IDatastoreDefinitionLocal {
    return {
      type: this.type,
      configuration: Object.assign({}, this.configuration, this.details.save())
    };
  }

  /** Reset dialog content to default */
  reset() {
    if (this.details) {
      this.details.reset();
    }
    this.dialog.setActiveTab(0);
  }

  /** Load data from an existing configuration */
  load(payload: IDatastoreDefinition) {
    this.reset();
    this.type = (payload as IDatastoreDefinitionLocal).type || "postgres95";
    this.configuration =
      (payload as IDatastoreDefinitionLocal).configuration || {};
    if (this.details) {
      this.details.load(this.configuration);
    }
  }

  // Called after create button is clicked.
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
