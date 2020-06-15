<template>
  <instance-configuration-editor
    class="editor"
    :tabkey="tabkey"
    :configuration="configuration"
    header="Configure Global Datastore Definitions Used by Tenants"
  >
    <rdb-configurations-table
      :configuration="configuration"
      @datastoreCreated="onRdbDatastoreCreated"
      @datastoreUpdated="onRdbDatastoreUpdated"
      @datastoreDeleted="onRdbDatastoreDeleted"
    />
    <content-divider />
    <ts-configurations-table
      :configuration="configuration"
      @datastoreCreated="onTsDatastoreCreated"
      @datastoreUpdated="onTsDatastoreUpdated"
      @datastoreDeleted="onTsDatastoreDeleted"
    />
  </instance-configuration-editor>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import Vue from "vue";
import { IInstanceConfiguration } from "sitewhere-rest-api";

import { ContentDivider } from "sitewhere-ide-components";

import InstanceConfigurationEditor from "../InstanceConfigurationEditor.vue";
import RdbConfigurationsTable from "./rdb/RdbConfigurationsTable.vue";
import TsConfigurationsTable from "./timeseries/TsConfigurationsTable.vue";

@Component({
  components: {
    ContentDivider,
    InstanceConfigurationEditor,
    RdbConfigurationsTable,
    TsConfigurationsTable
  }
})
export default class PersistenceConfigurationsEditor extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** Notifies when an RDB datastore is created */
  onRdbDatastoreCreated(): void {
    this.$emit("updated");
  }

  /** Notifies when an RDB datastore is updated */
  onRdbDatastoreUpdated(): void {
    this.$emit("updated");
  }
  /** Notifies when an RDB datastore is deleted */
  onRdbDatastoreDeleted(): void {
    this.$emit("updated");
  }

  /** Notifies when an TS datastore is created */
  onTsDatastoreCreated(): void {
    this.$emit("updated");
  }

  /** Notifies when an TS datastore is updated */
  onTsDatastoreUpdated(): void {
    this.$emit("updated");
  }
  /** Notifies when an TS datastore is deleted */
  onTsDatastoreDeleted(): void {
    this.$emit("updated");
  }
}
</script>

<style scoped>
.editor {
  border-bottom: 1px solid #eee;
}
</style>
