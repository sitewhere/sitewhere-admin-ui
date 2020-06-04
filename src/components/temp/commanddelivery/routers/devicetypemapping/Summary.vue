<template>
  <v-card flat>
    <section-overview title="Device Type Mapping Router">
      The mappings below will direct device commands to be delivered
      via command destinations based on device type. Any commands that
      do not match the mappings are delivered to the default destination.
    </section-overview>

    <v-data-table
      class="datatable mt-5 mb-5"
      dense
      :headers="headers"
      :items="displayedMappings"
      hide-default-footer
      no-data-text="No mappings have been defined"
      style="border: 1px solid #ddd;"
    >
      <template v-slot:item="props">
        <tr>
          <td width="48%">{{ props.item.deviceTypeName }}</td>
          <td width="48%">{{ props.item.destinationId }}</td>
          <td width="4%">
            <content-delete-icon />
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-card flat class="mb-7" v-if="defaultDestination">
      <content-field name="default destination" :value="defaultDestination" />
    </v-card>
    <v-card flat class="mb-7" v-else>
      <content-warning
        text="No default destination is set. This will cause tenant engine startup to fail!"
      />
    </v-card>
    <content-link
      class="mb-2"
      icon="fa-plus-circle"
      text="Add device type mapping"
      @linkClicked="onAddMapping"
    />
    <content-link icon="fa-edit" text="Update default destination" @linkClicked="onUpdateSettings" />
    <settings-update-dialog
      :destinations="destinations"
      ref="settings"
      @update="onSettingsUpdated"
    />
    <mapping-create-dialog
      :destinations="destinations"
      :deviceTypes="deviceTypes"
      ref="mapping"
      @create="onMappingAdded"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import SettingsUpdateDialog from "./SettingsUpdateDialog.vue";
import MappingCreateDialog from "./MappingCreateDialog.vue";

import { VCard, VDivider } from "vuetify/lib";
import {
  ContentField,
  ContentWarning,
  ContentLink,
  DatatableSection,
  ContentDeleteIcon,
  SectionOverview
} from "sitewhere-ide-components";

import {
  ICommandDestinationGenericConfiguration,
  IRouterGenericConfiguration,
  IDeviceTypeMappingRouterConfiguration,
  IDeviceTypeMapping
} from "sitewhere-configuration-model";

import {
  IDeviceType,
  IDeviceTypeSearchCriteria,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchResults
} from "sitewhere-rest-api";
import { AxiosResponse } from "axios";
import { showError, listDeviceTypes } from "sitewhere-ide-common";

/** Mapping for displaying data */
interface IDisplayedMapping {
  deviceTypeToken: string;
  deviceTypeName: string;
  destinationId: string;
}

@Component({
  components: {
    VCard,
    VDivider,
    ContentField,
    ContentWarning,
    ContentLink,
    DatatableSection,
    ContentDeleteIcon,
    SectionOverview,
    SettingsUpdateDialog,
    MappingCreateDialog
  }
})
export default class DeviceTypeMappingRouterSummary extends Vue {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Prop() readonly router!: IRouterGenericConfiguration;
  @Ref() readonly settings!: SettingsUpdateDialog;
  @Ref() readonly mapping!: MappingCreateDialog;

  deviceTypes: IDeviceType[] = [];

  /** Table headers */
  headers: { text: string; value: string }[] = [
    { text: "Device Type", value: "type" },
    { text: "Command Destination", value: "destination" },
    { text: "", value: "delete" }
  ];

  /** Called when component is created */
  created(): void {
    this.loadDeviceTypes();
  }

  /** Get device type mapping router configuration */
  get configuration(): IDeviceTypeMappingRouterConfiguration | null {
    return this.router
      ? (this.router.configuration as IDeviceTypeMappingRouterConfiguration)
      : null;
  }

  /** Indicates if there are mappings */
  get hasMappings(): boolean {
    return this.mappings ? this.mappings.length > 0 : false;
  }

  /** Current list of device type mappings */
  get mappings(): IDeviceTypeMapping[] | null {
    return this.configuration ? this.configuration.mappings : null;
  }

  /** Get default destination */
  get defaultDestination(): string | null {
    return this.configuration ? this.configuration.defaultDestination : null;
  }

  /** Create sorted list of displayed mappings */
  get displayedMappings(): IDisplayedMapping[] {
    const mappings: IDisplayedMapping[] = [];
    if (this.configuration) {
      this.configuration.mappings.forEach(mapping => {
        const type: IDeviceType | null = this.getDeviceTypeByToken(
          mapping.deviceTypeToken
        );
        console.log(this.deviceTypes, type);
        const display: IDisplayedMapping = {
          deviceTypeToken: mapping.deviceTypeToken,
          deviceTypeName: type ? type.name : mapping.deviceTypeToken,
          destinationId: mapping.destinationId
        };
        mappings.push(display);
      });
    }

    mappings.sort((a, b) => a.deviceTypeName.localeCompare(b.deviceTypeName));
    return mappings;
  }

  /** Add a new device type mapping */
  onAddMapping(): void {
    this.mapping.openDialog();
  }

  /** Called after a new mapping is added */
  onMappingAdded(mapping: IDeviceTypeMapping): void {
    if (this.configuration) {
      this.configuration.mappings.push(mapping);
      this.$emit("update");
    }
  }

  /** Update command router settings */
  onUpdateSettings(): void {
    this.settings.openDialog(this.router.configuration);
  }

  /** Called after router settings have been updated. */
  onSettingsUpdated(updated: IDeviceTypeMappingRouterConfiguration): void {
    this.router.configuration = updated;
    this.$emit("update");
  }

  /** Load device types asynchronously */
  async loadDeviceTypes() {
    try {
      const criteria: IDeviceTypeSearchCriteria = {
        pageNumber: 1,
        pageSize: 0
      };
      const format: IDeviceTypeResponseFormat = {};
      const response: AxiosResponse<IDeviceTypeSearchResults> = await listDeviceTypes(
        this.$store,
        criteria,
        format
      );
      this.deviceTypes = response.data.results;
    } catch (err) {
      showError(this, err);
    }
  }

  /** Get a device type by token */
  getDeviceTypeByToken(token: string): IDeviceType | null {
    let match: IDeviceType | null = null;
    this.deviceTypes.forEach(deviceType => {
      if (deviceType.token === token) {
        match = deviceType;
      }
    });
    return match;
  }
}
</script>

<style scoped>
.datatable {
  width: 50%;
}
.datatable >>> tr {
  height: 30px;
}
.datatable >>> tr:hover {
  background: #ffffff !important;
}
.datatable >>> th {
  padding: 5px !important;
}
.datatable >>> td {
  padding: 5px !important;
  height: 30px;
}
</style>
