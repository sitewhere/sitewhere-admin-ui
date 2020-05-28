<template>
  <list-page
    :icon="icon"
    title="Device Groups"
    loadingMessage="Loading device groups ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="group in matches" :key="group.token">
        <device-group-list-entry
          :deviceGroup="group"
          class="mb-1"
          @deviceGroupOpened="onOpenGroup"
        />
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No device groups have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{ addIcon }}</v-icon>in the toolbar to add a device group.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <device-group-create-dialog ref="add" @deviceGroupAdded="refresh" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Device Group" @action="onAddDeviceGroup" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import {
  NavigationIcon,
  listDeviceGroups,
  routeTo
} from "sitewhere-ide-common";
import { ListComponent, ListLayout } from "sitewhere-ide-components";

import DeviceGroupListEntry from "./DeviceGroupListEntry.vue";
import DeviceGroupCreateDialog from "./DeviceGroupCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { ListPage } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import {
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    DeviceGroupListEntry,
    DeviceGroupCreateDialog,
    AddButton,
    NoResultsPanel
  }
})
export default class DeviceGroupsList extends ListComponent<
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchResults
> {
  @Ref() readonly add!: DeviceGroupCreateDialog;

  addIcon: string = NavigationIcon.Add;

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceGroup;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceGroupSearchCriteria {
    const criteria: IDeviceGroupSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceGroupResponseFormat {
    const format: IDeviceGroupResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceGroupSearchCriteria,
    format: IDeviceGroupResponseFormat
  ): AxiosPromise<IDeviceGroupSearchResults> {
    return listDeviceGroups(this.$store, criteria, format);
  }

  // Called to open detail page for group.
  onOpenGroup(group: IDeviceGroup) {
    routeTo(this, "/groups/" + group.token);
  }

  // Called to open dialog.
  onAddDeviceGroup() {
    this.add.open();
  }
}
</script>

<style scoped></style>
