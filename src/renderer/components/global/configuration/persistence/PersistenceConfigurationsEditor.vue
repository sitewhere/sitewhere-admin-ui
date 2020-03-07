<template>
  <instance-configuration-editor
    class="editor"
    :tabkey="tabkey"
    :configuration="configuration"
    header="Configure Global Datastore Definitions Used by Tenants"
  >
    <rdb-configurations-table
      :configuration="configuration"
      @datastoreUpdated="onRdbDatastoreUpdated"
    />
    <v-divider class="mt-4 mb-4" />
    <influx-configurations-table :configuration="configuration" />
    <v-divider class="mt-4 mb-4" />
    <cassandra-configurations-table :configuration="configuration" />
  </instance-configuration-editor>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import Vue from "vue";
import { IInstanceConfiguration } from "sitewhere-rest-api";

import InstanceConfigurationEditor from "../InstanceConfigurationEditor.vue";
import RdbConfigurationsTable from "./rdb/RdbConfigurationsTable.vue";
import InfluxConfigurationsTable from "./influx/InfluxConfigurationsTable.vue";
import CassandraConfigurationsTable from "./cassandra/CassandraConfigurationsTable.vue";

@Component({
  components: {
    InstanceConfigurationEditor,
    RdbConfigurationsTable,
    InfluxConfigurationsTable,
    CassandraConfigurationsTable
  }
})
export default class PersistenceConfigurationsEditor extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** Notifies when an RDB datastore is updated */
  onRdbDatastoreUpdated(): void {
    this.$emit("updated");
  }
}
</script>

<style scoped>
.editor {
  border-bottom: 1px solid #eee;
}
</style>
