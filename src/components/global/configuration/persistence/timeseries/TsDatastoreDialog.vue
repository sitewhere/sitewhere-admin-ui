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
    <dialog-header>
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
    </dialog-header>
    <v-divider class="mb-2" />
    <warp-10-fields v-show="isWarp10" ref="warp10" />
    <influx-db-fields v-show="isInfluxDB" ref="influxdb" />
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

import {
  Warp10Fields,
  InfluxDbFields,
  NoFields
} from "sitewhere-admin-ui-plugins";

import {
  IDatastoreDefinition,
  IDatastoreDefinitionLocal
} from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    DialogHeader,
    Warp10Fields,
    InfluxDbFields,
    NoFields
  }
})
export default class TsDatastoreDialog extends DialogComponent<
  IDatastoreDefinition
> {
  @Prop() readonly instance!: IInstanceConfiguration;
  @Prop() readonly title!: string;
  @Prop() readonly createLabel!: string;
  @Ref() readonly dialog!: ITabbedComponent;

  @Ref() readonly warp10!: Warp10Fields;
  @Ref() readonly influxdb!: InfluxDbFields;
  @Ref() readonly unknown!: NoFields;

  type = "warp10";
  configuration: any;

  /** List of supported database types */
  databaseTypes: { text: string; value: string }[] = [
    {
      text: "Warp 10",
      value: "warp10"
    },
    {
      text: "InfluxDB",
      value: "influxdb"
    }
  ];

  /** Get displayed summary panel */
  get details(): DialogSection {
    if (this.isWarp10) {
      return this.warp10;
    } else if (this.isInfluxDB) {
      return this.influxdb;
    } else {
      return this.unknown;
    }
  }

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Datastore;
  }

  /** Indicates whether database is Warp 10 */
  get isWarp10(): boolean {
    return this.type == "warp10";
  }

  /** Indicates whether database is InfluxDB */
  get isInfluxDB(): boolean {
    return this.type == "influxdb";
  }

  /** Indicates whether database is unknown */
  get isUnknown(): boolean {
    return !this.isWarp10 && !this.isInfluxDB;
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

