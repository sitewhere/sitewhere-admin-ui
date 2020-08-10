<template>
  <content-section icon="fa-database" title="Time Series Database Global Configurations">
    <datatable-section :headers="headers" :items="tsConfigsAsSortedArray" width="50%">
      <template v-slot:item="props">
        <tr>
          <td width="15%" class="truncate" :title="props.item.meta.name">
            <datatable-link
              @linkClicked="onOpenDatastore(props.item.meta.name)"
              :text="props.item.meta.name"
            />
          </td>
          <td width="20%" class="truncate" :title="props.item.meta.type">{{ props.item.meta.type }}</td>
          <td
            width="60%"
            class="truncate"
            :title="props.item.meta.connection"
          >{{ props.item.meta.connection }}</td>
          <td width="5%" title="Delete">
            <content-delete-icon @delete="onDeleteDatastore(props.item.meta.name)" />
          </td>
        </tr>
      </template>
      <template v-slot:datatable-footer>
        <content-link
          class="mt-5"
          icon="fa-plus-circle"
          text="Add new timeseries database global configuration."
          @linkClicked="onAddDatastore"
        />
      </template>
      <template v-slot:datatable-dialogs>
        <ts-datastore-create-dialog
          ref="create"
          :configuration="configuration"
          @created="onDatastoreCreated"
        />
        <ts-datastore-update-dialog
          ref="update"
          :configuration="configuration"
          @updated="onDatastoreUpdated"
        />
      </template>
    </datatable-section>
  </content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

import {
  IInstanceConfiguration,
  ITimeSeriesConfiguration,
  ITimeSeriesConfigurationMap
} from "sitewhere-rest-api";
import { IDatastoreDefinitionLocal } from "sitewhere-configuration-model";

import {
  ContentSection,
  DatatableSection,
  DatatableLink,
  ContentDeleteIcon,
  ContentLink
} from "sitewhere-ide-components";

import TsDatastoreCreateDialog from "./TsDatastoreCreateDialog.vue";
import TsDatastoreUpdateDialog from "./TsDatastoreUpdateDialog.vue";

@Component({
  components: {
    ContentSection,
    DatatableSection,
    DatatableLink,
    ContentDeleteIcon,
    ContentLink,
    TsDatastoreCreateDialog,
    TsDatastoreUpdateDialog
  }
})
export default class TsConfigurationsTable extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;
  @Ref() readonly create!: TsDatastoreCreateDialog;
  @Ref() readonly update!: TsDatastoreUpdateDialog;

  /** Time series configurations in format for display */
  tsConfigsAsSortedArray: any[] = [];

  /** Name of RDB entry being updated */
  updating: string | null = null;

  headers: any[] = [
    { text: "Name", value: "name" },
    { text: "Type", value: "type" },
    { text: "Connection", value: "connection" },
    { text: "", value: "delete" }
  ];

  @Watch("tsConfigurations", { immediate: true })
  onRdbConfigurationsUpdated() {
    this.calculateTsConfigsAsSortedArray();
  }

  /** Global timeseries configurations */
  get tsConfigurations(): ITimeSeriesConfigurationMap | null {
    return this.configuration && this.configuration.persistenceConfigurations
      ? this.configuration.persistenceConfigurations.timeSeriesConfigurations
      : null;
  }

  /** Get timeseries configs as a sorted array */
  calculateTsConfigsAsSortedArray(): void {
    const configs: any[] = [];
    const hashed: ITimeSeriesConfigurationMap | null = this.tsConfigurations;
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
    this.tsConfigsAsSortedArray = configs;
  }

  /** Determine connection info based on type */
  connectionForType(meta: any, config: any): string {
    if (meta.type == "warp10") {
      return `${config.hostname}:${config.port}`;
    } else if (meta.type == "influxdb") {
      return `${config.hostname}:${config.port}`;
    }
    return "Unknown";
  }

  /** Add a new timeseries datastore */
  onAddDatastore() {
    this.create.openDialog();
  }

  /** Open an existing timeseries datastore */
  onOpenDatastore(name: string) {
    this.updating = name;
    const configs: ITimeSeriesConfigurationMap | null = this.tsConfigurations;
    if (configs) {
      const config: ITimeSeriesConfiguration = configs[name];
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
    const configs: ITimeSeriesConfigurationMap | null = this.tsConfigurations;
    if (configs) {
      delete configs[name];
    }
    this.$emit("datastoreDeleted");
    this.calculateTsConfigsAsSortedArray();
  }

  /** Called with creation information */
  onDatastoreCreated(created: any) {
    const name: string = created.name;
    const definition: IDatastoreDefinitionLocal = created.definition;

    const configs: ITimeSeriesConfigurationMap | null = this.tsConfigurations;
    if (configs) {
      const ts: ITimeSeriesConfiguration = {
        type: definition.type,
        configuration: definition.configuration
      };
      configs[name] = ts;
    }
    this.$emit("datastoreCreated");
    this.calculateTsConfigsAsSortedArray();
  }

  /** Called with updated information */
  onDatastoreUpdated(updated: IDatastoreDefinitionLocal) {
    const configs: ITimeSeriesConfigurationMap | null = this.tsConfigurations;
    if (configs && this.updating) {
      const ts: ITimeSeriesConfiguration = {
        type: updated.type,
        configuration: updated.configuration
      };
      configs[this.updating] = ts;
    }
    this.updating = null;
    this.$emit("datastoreUpdated");
    this.calculateTsConfigsAsSortedArray();
  }
}
</script>

<style scoped>
.truncate {
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>