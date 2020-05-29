<template>
  <datatable-section
    icon="fa-database"
    title="Cassandra Global Configurations"
    :headers="headers"
    :items="configsAsSortedArray"
    width="50%"
  >
    <template v-slot:item="props">
      <tr>
        <td>
          <datatable-link
            @linkClicked="onOpenDatastore(props.item.meta.name)"
            :text="props.item.meta.name"
          />
        </td>
        <td>{{ props.item.config.contactPoints }}</td>
        <td>{{ props.item.config.keyspace }}</td>
        <td>
          <content-delete-icon @delete="onDeleteDatastore(props.item.meta.name)" />
        </td>
      </tr>
    </template>
    <template v-slot:datatable-footer>
      <content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add new Cassandra database global configuration."
        @linkClicked="onAddDatastore"
      />
    </template>
  </datatable-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import { IInstanceConfiguration } from "sitewhere-rest-api";

import {
  DatatableSection,
  DatatableLink,
  ContentDeleteIcon,
  ContentLink
} from "sitewhere-ide-components";

@Component({
  components: {
    DatatableSection,
    DatatableLink,
    ContentDeleteIcon,
    ContentLink
  }
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
  onConfigurationsUpdated() {
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
    const configs: any[] = [];
    const hashed: any | null = this.cassandraConfigurations;
    if (hashed) {
      const keys: string[] = Object.keys(hashed);
      keys.forEach(key => {
        if (hashed) {
          const config: any = hashed[key];
          const meta: any = {};
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
  onOpenDatastore(name: string) {
    console.log(name);
  }
}
</script>

<style scoped></style>
