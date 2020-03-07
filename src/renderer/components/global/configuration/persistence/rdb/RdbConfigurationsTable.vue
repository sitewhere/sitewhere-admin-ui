<template>
  <datatable-section
    icon="fa-database"
    title="Relational Database Global Configurations"
    :headers="headers"
    :items="rdbConfigsAsSortedArray"
    width="50%"
    ><template v-slot:items="props">
      <td>
        <datatable-link
          @linkClicked="onOpenDatastore(props.item.meta.name)"
          :text="props.item.meta.name"
        />
      </td>
      <td>{{ props.item.meta.type }}</td>
      <td>{{ props.item.meta.connection }}</td>
      <td><v-icon small class="text--grey">fa-trash</v-icon></td>
    </template>
    <template v-slot:datatable-footer>
      <content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add new relational database global configuration."
        @linkClicked="onAddDatastore"
      />
    </template>
    <template v-slot:datatable-dialogs>
      <rdb-datastore-update-dialog
        ref="dialog"
        :configuration="configuration"
        @updated="onDatastoreUpdated"
      />
    </template>
  </datatable-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import DatatableSection from "../../../../configuration/DatatableSection.vue";
import DatatableLink from "../../../../configuration/DatatableLink.vue";
import ContentLink from "../../../../configuration/ContentLink.vue";
import RdbDatastoreUpdateDialog from "./RdbDatastoreUpdateDialog.vue";

import {
  IInstanceConfiguration,
  IRdbConfigurationMap
} from "sitewhere-rest-api";
import { IRdbConfiguration } from "sitewhere-rest-api";
import { IDatastoreDefinitionLocal } from "sitewhere-configuration-model";

@Component({
  components: {
    DatatableSection,
    DatatableLink,
    ContentLink,
    RdbDatastoreUpdateDialog
  }
})
export default class RdbConfigurationsTable extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: RdbDatastoreUpdateDialog;
  }>;

  /** Name of RDB entry being updated */
  updating: string | null = null;

  headers: any[] = [
    { text: "Name", value: "name" },
    { text: "Type", value: "type" },
    { text: "Connection", value: "connection" },
    { text: "", value: "delete" }
  ];

  /** Global RDB configurations */
  get rdbConfigurations(): IRdbConfigurationMap | null {
    return this.configuration && this.configuration.persistenceConfigurations
      ? this.configuration.persistenceConfigurations.rdbConfigurations
      : null;
  }

  /** Get RDB configs as a sorted array */
  get rdbConfigsAsSortedArray(): any[] {
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
    return configs;
  }

  /** Determine connection info based on type */
  connectionForType(meta: any, config: any): string {
    if (meta.type == "postgres95") {
      return `${config.hostname}:${config.port}`;
    }
    return "Unknown";
  }

  /** Add a new RDB datastore */
  onAddDatastore() {}

  /** Open an existing RDB datastore */
  onOpenDatastore(name: string) {
    this.updating = name;
    let configs: IRdbConfigurationMap | null = this.rdbConfigurations;
    if (configs) {
      let config: IRdbConfiguration = configs[name];
      this.$refs.dialog.load({
        type: config.type,
        configuration: config.configuration
      });
      this.$refs.dialog.openDialog();
    }
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
  }
}
</script>

<style scoped></style>
