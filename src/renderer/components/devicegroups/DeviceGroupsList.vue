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
      <v-flex xs6 v-for="(group) in matches" :key="group.token">
        <device-group-list-entry
          :deviceGroup="group"
          class="mb-1"
          @deviceGroupOpened="onOpenGroup"
        />
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <device-group-create-dialog ref="add" @groupAdded="refresh"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Device Group" @action="onAddDeviceGroup"/>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import ListPage from "../common/ListPage.vue";
import ListLayout from "../common/ListLayout.vue";
import DeviceGroupListEntry from "./DeviceGroupListEntry.vue";
import DeviceGroupCreateDialog from "./DeviceGroupCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { NavigationIcon } from "../../libraries/constants";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDeviceGroups } from "../../rest/sitewhere-device-groups-api";
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
    NavigationActionButton
  }
})
export default class DeviceGroupsList extends ListComponent<
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchResults
> {
  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceGroup;
  }

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
