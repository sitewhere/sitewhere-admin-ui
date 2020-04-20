<template>
  <sw-datatable-section
    icon="fa-database"
    title="Cassandra Global Configurations"
    :headers="headers"
    :items="configsAsSortedArray"
    width="50%"
  >
    <template v-slot:items="props">
      <td>
        <sw-datatable-link
          @linkClicked="onOpenDatastore(props.item.meta.name)"
          :text="props.item.meta.name"
        />
      </td>
      <td>{{ props.item.config.contactPoints }}</td>
      <td>{{ props.item.config.keyspace }}</td>
      <td>
        <sw-content-delete-icon @delete="onDeleteDatastore(props.item.meta.name)" />
      </td>
    </template>
    <template v-slot:datatable-footer>
      <sw-content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add new Cassandra database global configuration."
        @linkClicked="onAddDatastore"
      />
    </template>
  </sw-datatable-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "sitewhere-ide-common";

import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: {}
})
export default class InfluxConfigurationsTable extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;

  headers: any[] = [
    { text: "Name", value: "name" },
    { text: "Contact Points", value: "contactPoints" },
    { text: "Keyspace", value: "keyspace" },
    { text: "", value: "delete" }
  ];

  /** Datastore configurations in format for display */
  configsAsSortedArray: any[] = [];

  @Watch("cassandraConfigurations", { immediate: true })
  onConfigurationsUpdated(updated: any) {
    this.calculateConfigsAsSortedArray();
  }

  /** Global Cassandra configurations */
  get cassandraConfigurations(): any | null {
    return this.configuration && this.configuration.persistenceConfigurations
      ? this.configuration.persistenceConfigurations.cassandraConfigurations
      : null;
  }

  /** Get InfluxDB configs as a sorted array */
  calculateConfigsAsSortedArray(): void {
    let configs: any[] = [];
    let hashed: any | null = this.cassandraConfigurations;
    if (hashed) {
      let keys: string[] = Object.keys(hashed);
      keys.forEach(key => {
        if (hashed) {
          let config: any = hashed[key];
          let meta: any = {};
          meta.name = key;
          configs.push({ meta: meta, config: config });
        }
      });
    }
    configs.sort(function(a, b) {
      return a.meta.name.localeCompare(b.meta.name);
    });
    this.configsAsSortedArray = configs;
  }

  /** Add a new RDB datastore */
  onAddDatastore() {}

  /** Open an existing RDB datastore */
  onOpenDatastore(name: string) {}
}
</script>

<style scoped></style>
