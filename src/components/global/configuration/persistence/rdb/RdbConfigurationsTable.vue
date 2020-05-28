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
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

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
  @Ref() readonly create!: RdbDatastoreCreateDialog;
  @Ref() readonly update!: RdbDatastoreUpdateDialog;

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
  onRdbConfigurationsUpdated() {
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
    const configs: any[] = [];
    const hashed: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (hashed) {
      const keys: string[] = Object.keys(hashed);
      keys.forEach(key => {
        if (hashed) {
          const config: any = hashed[key].configuration;
          const meta: any = {};
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
    this.create.openDialog();
  }

  /** Open an existing RDB datastore */
  onOpenDatastore(name: string) {
    this.updating = name;
    const configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs) {
      const config: IRdbConfiguration = configs[name];
      this.update.load({
        type: config.type,
        configuration: config.configuration
      });
      this.update.openDialog();
    }
  }

  /** Called to remove a datastore from the list */
  onDeleteDatastore(name: string) {
    this.updating = name;
    const configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs) {
      delete configs[name];
    }
    this.$emit("datastoreDeleted");
    this.calculateRdbConfigsAsSortedArray();
  }

  /** Called with creation information */
  onDatastoreCreated(created: any) {
    const name: string = created.name;
    const definition: IDatastoreDefinitionLocal = created.definition;

    const configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs) {
      const rdb: IRdbConfiguration = {
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
    const configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs && this.updating) {
      const rdb: IRdbConfiguration = {
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
