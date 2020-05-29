<template>
  <datatable-section
    icon="fa-database"
    title="InfluxDB Global Configurations"
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
        <td>{{ props.item.meta.connection }}</td>
        <td>{{ props.item.config.databaseName }}</td>
        <td>
          <content-delete-icon @delete="onDeleteDatastore(props.item.meta.name)" />
        </td>
      </tr>
    </template>
    <template v-slot:datatable-footer>
      <content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add new InfluxDB database global configuration."
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
    { text: "Connection", value: "connection" },
    { text: "Database", value: "databaseName" },
    { text: "", value: "delete" }
  ];

  /** Datastore configurations in format for display */
  configsAsSortedArray: any[] = [];

  @Watch("influxConfigurations", { immediate: true })
  onConfigurationsUpdated() {
    this.calculateConfigsAsSortedArray();
  }

  /** Global InfluxDB configurations */
  get influxConfigurations(): any | null {
    return this.configuration && this.configuration.persistenceConfigurations
      ? this.configuration.persistenceConfigurations.influxDbConfigurations
      : null;
  }

  /** Get InfluxDB configs as a sorted array */
  calculateConfigsAsSortedArray(): void {
    const configs: any[] = [];
    const hashed: any | null = this.influxConfigurations;
    if (hashed) {
      const keys: string[] = Object.keys(hashed);
      keys.forEach(key => {
        if (hashed) {
          const config: any = hashed[key];
          const meta: any = {};
          meta.name = key;
          meta.connection = `${config.hostname}:${config.port}`;
          configs.push({ meta: meta, config: config });
        }
      });
    }
    configs.sort(function(a, b) {
      return a.meta.name.localeCompare(b.meta.name);
    });
    this.configsAsSortedArray = configs;
  }

  /** Add a new Influx datastore */
  onAddDatastore() {}

  /** Open an existing Influx datastore */
  onOpenDatastore(name: string) {
    console.log(name);
  }

  /** Called to delete a datastore by id */
  onDeleteDatastore(name: string): void {
    console.log(name);
  }
}
</script>

<style scoped></style>
