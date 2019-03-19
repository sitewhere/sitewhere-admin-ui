<template>
  <list-page
    icon="cubes"
    title="Device Groups"
    loadingMessage="Loading device groups ..."
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs6 v-for="(group) in matches" :key="group.token">
      <device-group-list-entry :group="group" class="mb-1" @click="onOpenGroup(group)"></device-group-list-entry>
    </v-flex>
    <template slot="dialogs">
      <device-group-create-dialog ref="add" @groupAdded="refresh"></device-group-create-dialog>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Device Group" @action="onAddDeviceGroup"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import DeviceGroupListEntry from "./DeviceGroupListEntry.vue";
import DeviceGroupCreateDialog from "./DeviceGroupCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDeviceGroups } from "../../rest/sitewhere-device-groups-api";
import {
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchResults
} from "sitewhere-rest-api";

export class DeviceGroupListComponent extends ListComponent<
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchResults
> {}

@Component({
  components: {
    ListPage,
    DeviceGroupListEntry,
    DeviceGroupCreateDialog,
    NavigationActionButton
  }
})
export default class DeviceGroupsList extends Mixins(DeviceGroupListComponent) {
  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceGroupSearchCriteria {
    let criteria: IDeviceGroupSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceGroupResponseFormat {
    let format: IDeviceGroupResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDeviceGroupSearchCriteria,
    format: IDeviceGroupResponseFormat
  ): AxiosPromise<IDeviceGroupSearchResults> {
    return listDeviceGroups(store, criteria, format);
  }

  // Called to open detail page for group.
  onOpenGroup(group: IDeviceGroup) {
    routeTo(this, "/groups/" + group.token);
  }

  // Called to open dialog.
  onAddDeviceGroup() {
    (this.$refs.add as any).onOpenDialog();
  }
}
</script>

<style scoped>
</style>
