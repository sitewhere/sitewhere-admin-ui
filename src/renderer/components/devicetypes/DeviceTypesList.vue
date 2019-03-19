<template>
  <list-page
    icon="cog"
    title="Device Types"
    loadingMessage="Loading device types ..."
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs6 v-for="(deviceType) in matches" :key="deviceType.token">
      <device-type-list-entry :deviceType="deviceType" @deviceTypeOpened="onOpenDeviceType"></device-type-list-entry>
    </v-flex>
    <template slot="dialogs">
      <device-type-create-dialog ref="add" @deviceTypeAdded="onDeviceTypeAdded"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Device Type" @action="onAddDeviceType"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import DeviceTypeListEntry from "./DeviceTypeListEntry.vue";
import DeviceTypeCreateDialog from "./DeviceTypeCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDeviceTypes } from "../../rest/sitewhere-device-types-api";
import {
  IDeviceType,
  IDeviceTypeSearchCriteria,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchResults
} from "sitewhere-rest-api";

export class DeviceTypeListComponent extends ListComponent<
  IDeviceType,
  IDeviceTypeSearchCriteria,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchResults
> {}

@Component({
  components: {
    ListPage,
    DeviceTypeListEntry,
    DeviceTypeCreateDialog,
    NavigationActionButton
  }
})
export default class DeviceTypesList extends Mixins(DeviceTypeListComponent) {
  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceTypeSearchCriteria {
    let criteria: IDeviceTypeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceTypeResponseFormat {
    let format: IDeviceTypeResponseFormat = {};
    format.includeAsset = true;
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDeviceTypeSearchCriteria,
    format: IDeviceTypeResponseFormat
  ): AxiosPromise<IDeviceTypeSearchResults> {
    return listDeviceTypes(store, criteria, format);
  }

  // Called to open detail page.
  onOpenDeviceType(deviceType: IDeviceType) {
    routeTo(this, "/devicetypes/" + deviceType.token);
  }

  // Called to open dialog.
  onAddDeviceType() {
    (this.$refs.add as any).onOpenDialog();
  }

  // Called when a new device type is added.
  onDeviceTypeAdded() {
    this.refresh();
  }
}
</script>

<style scoped>
</style>
