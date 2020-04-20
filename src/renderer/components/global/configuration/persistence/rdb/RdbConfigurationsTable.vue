<template>
  <sw-datatable-section
    icon="fa-database"
    title="Relational Database Global Configurations"
    :headers="headers"
    :items="rdbConfigsAsSortedArray"
    width="50%"
  >
    <template v-slot:items="props">
      <td>
        <sw-datatable-link
          @linkClicked="onOpenDatastore(props.item.meta.name)"
          :text="props.item.meta.name"
        />
      </td>
      <td>{{ props.item.meta.type }}</td>
      <td>{{ props.item.meta.connection }}</td>
      <td>
        <sw-content-delete-icon @delete="onDeleteDatastore(props.item.meta.name)" />
      </td>
    </template>
    <template v-slot:datatable-footer>
      <sw-content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add new relational database global configuration."
        @linkClicked="onAddDatastore"
      />
    </template>
    <template v-slot:datatable-dialogs>
      <rdb-datastore-create-dialog
        ref="create"
        :configuration="configuration"
        @created="onDatastoreCreated"
      />
      <rdb-datastore-update-dialog
        ref="update"
        :configuration="configuration"
        @updated="onDatastoreUpdated"
      />
    </template>
  </sw-datatable-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs, Watch } from "sitewhere-ide-common";

import RdbDatastoreCreateDialog from "./RdbDatastoreCreateDialog.vue";
import RdbDatastoreUpdateDialog from "./RdbDatastoreUpdateDialog.vue";

import {
  IInstanceConfiguration,
  IRdbConfigurationMap
} from "sitewhere-rest-api";
import { IRdbConfiguration } from "sitewhere-rest-api";
import { IDatastoreDefinitionLocal } from "sitewhere-configuration-model";

@Component({
  components: {
    RdbDatastoreCreateDialog,
    RdbDatastoreUpdateDialog
  }
})
export default class RdbConfigurationsTable extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** References */
  $refs!: Refs<{
    create: RdbDatastoreCreateDialog;
    update: RdbDatastoreUpdateDialog;
  }>;

  /** RDB configurations in format for display */
  rdbConfigsAsSortedArray: any[] = [];

  /** Name of RDB entry being updated */
  updating: string | null = null;

  headers: any[] = [
    { text: "Name", value: "name" },
    { text: "Type", value: "type" },
    { text: "Connection", value: "connection" },
    { text: "", value: "delete" }
  ];

  @Watch("rdbConfigurations", { immediate: true })
  onRdbConfigurationsUpdated(updated: IRdbConfigurationMap) {
    this.calculateRdbConfigsAsSortedArray();
  }

  /** Global RDB configurations */
  get rdbConfigurations(): IRdbConfigurationMap | null {
    return this.configuration && this.configuration.persistenceConfigurations
      ? this.configuration.persistenceConfigurations.rdbConfigurations
      : null;
  }

  /** Get RDB configs as a sorted array */
  calculateRdbConfigsAsSortedArray(): void {
    let configs: any[] = [];
    let hashed: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (hashed) {
      let keys: string[] = Object.keys(hashed);
      keys.forEach(key => {
        if (hashed) {
          let config: any = hashed[key].configuration;
          let meta: any = {};
          meta.type = hashed[key].type;
          meta.name = key;
          meta.connection = this.connectionForType(meta, config);
          configs.push({ meta: meta, config: config });
        }
      });
    }
    configs.sort(function(a, b) {
      return a.meta.name.localeCompare(b.meta.name);
    });
    this.rdbConfigsAsSortedArray = configs;
  }

  /** Determine connection info based on type */
  connectionForType(meta: any, config: any): string {
    if (meta.type == "postgres95") {
      return `${config.hostname}:${config.port}`;
    }
    return "Unknown";
  }

  /** Add a new RDB datastore */
  onAddDatastore() {
    this.$refs.create.openDialog();
  }

  /** Open an existing RDB datastore */
  onOpenDatastore(name: string) {
    this.updating = name;
    let configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs) {
      let config: IRdbConfiguration = configs[name];
      this.$refs.update.load({
        type: config.type,
        configuration: config.configuration
      });
      this.$refs.update.openDialog();
    }
  }

  /** Called to remove a datastore from the list */
  onDeleteDatastore(name: string) {
    this.updating = name;
    let configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs) {
      delete configs[name];
    }
    this.$emit("datastoreDeleted");
    this.calculateRdbConfigsAsSortedArray();
  }

  /** Called with creation information */
  onDatastoreCreated(created: any) {
    let name: string = created.name;
    let definition: IDatastoreDefinitionLocal = created.definition;

    let configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs) {
      let rdb: IRdbConfiguration = {
        type: definition.type,
        configuration: definition.configuration
      };
      configs[name] = rdb;
    }
    this.$emit("datastoreCreated");
    this.calculateRdbConfigsAsSortedArray();
  }

  /** Called with updated information */
  onDatastoreUpdated(updated: IDatastoreDefinitionLocal) {
    let configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs && this.updating) {
      let rdb: IRdbConfiguration = {
        type: updated.type,
        configuration: updated.configuration
      };
      configs[this.updating] = rdb;
    }
    this.updating = null;
    this.$emit("datastoreUpdated");
    this.calculateRdbConfigsAsSortedArray();
  }
}
</script>

<style scoped></style>
