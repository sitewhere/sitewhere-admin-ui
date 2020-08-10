<template>
  <list-page
    :icon="icon"
    title="Device Types"
    loadingMessage="Loading device types ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="deviceType in matches" :key="deviceType.token">
        <device-type-list-entry :deviceType="deviceType" @deviceTypeOpened="onOpenDeviceType" />
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No device types have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{ addIcon }}</v-icon>in the toolbar to add a device type.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <device-type-create-dialog ref="add" @deviceTypeAdded="onDeviceTypeAdded" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Device Type" @action="onAddDeviceType" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, listDeviceTypes } from "sitewhere-ide-common";
import { ListComponent, ListPage, ListLayout } from "sitewhere-ide-components";

import DeviceTypeListEntry from "./DeviceTypeListEntry.vue";
import DeviceTypeCreateDialog from "./DeviceTypeCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import {} from "../../libraries/constants";
import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import {
  IDeviceType,
  IDeviceTypeSearchCriteria,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    DeviceTypeListEntry,
    DeviceTypeCreateDialog,
    AddButton,
    NoResultsPanel
  }
})
export default class DeviceTypesList extends ListComponent<
  IDeviceType,
  IDeviceTypeSearchCriteria,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchResults
> {
  @Ref() readonly add!: DeviceTypeCreateDialog;

  addIcon: string = NavigationIcon.Add;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceTypeSearchCriteria {
    const criteria: IDeviceTypeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceTypeResponseFormat {
    const format: IDeviceTypeResponseFormat = {};
    format.includeAsset = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceTypeSearchCriteria,
    format: IDeviceTypeResponseFormat
  ): AxiosPromise<IDeviceTypeSearchResults> {
    return listDeviceTypes(this.$store, criteria, format);
  }

  // Called to open detail page.
  onOpenDeviceType(deviceType: IDeviceType) {
    routeTo(this, "/devicetypes/" + deviceType.token);
  }

  // Called to open dialog.
  onAddDeviceType() {
    this.add.open();
  }

  // Called when a new device type is added.
  onDeviceTypeAdded() {
    this.refresh();
  }
}
</script>

<style scoped></style>
