<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device statuses..."
  >
    <v-container class="pa-2" fluid grid-list-md fill-height>
      <v-layout row wrap>
        <no-results-panel
          v-if="matches.length === 0"
          text="No Device Statuses Found for Device Type"
        ></no-results-panel>
        <div v-else>
          <v-flex xs4 v-for="status in matches" :key="status.code">
            <div>
              <device-status-panel
                :status="status"
                :deviceType="deviceType"
                @statusDeleted="refresh"
                @statusUpdated="refresh"
              ></device-status-panel>
            </div>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";

import ListTab from "../common/ListTab.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";
import DeviceStatusListEntry from "../statuses/DeviceStatusListEntry.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listDeviceStatuses } from "../../rest/sitewhere-device-statuses-api";
import {
  IDeviceType,
  IDeviceStatus,
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListTab,
    NoResultsPanel,
    DeviceStatusListEntry
  }
})
export default class DeviceTypeStatuses extends ListComponent<
  IDeviceStatus,
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceType!: IDeviceType;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceStatusSearchCriteria {
    let criteria: IDeviceStatusSearchCriteria = {};
    criteria.deviceTypeToken = this.deviceType.token;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceStatusResponseFormat {
    let format: IDeviceStatusResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDeviceStatusSearchCriteria,
    format: IDeviceStatusResponseFormat
  ): AxiosPromise<IDeviceStatusSearchResults> {
    return listDeviceStatuses(store, criteria, format);
  }
}
</script>

<style scoped>
</style>
