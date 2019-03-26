<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device commands..."
    :results="results"
  >
    <v-container class="pa-2" fluid grid-list-md fill-height>
      <v-layout row wrap>
        <v-flex xs12>
          <command-namespace-list-entry
            :namespace="namespace"
            :deviceType="deviceType"
            @commandDeleted="refresh"
            @commandUpdated="refresh"
            v-for="namespace in matches"
            :key="namespace.value"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListTab from "../common/ListTab.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";
import CommandNamespaceListEntry from "../commands/CommandNamespaceListEntry.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listDeviceCommandsByNamespace } from "../../rest/sitewhere-device-commands-api";
import {
  IDeviceType,
  IDeviceCommandNamespace,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandNamespaceSearchResults
} from "sitewhere-rest-api";

export class DeviceTypeCommandsListComponent extends ListComponent<
  IDeviceCommandNamespace,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandNamespaceSearchResults
> {}

@Component({
  components: {
    ListTab,
    NoResultsPanel,
    CommandNamespaceListEntry
  }
})
export default class DeviceTypeCommands extends Mixins(
  DeviceTypeCommandsListComponent
) {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceType!: IDeviceType;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceCommandSearchCriteria {
    let criteria: IDeviceCommandSearchCriteria = {};
    criteria.deviceTypeToken = this.deviceType.token;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceCommandResponseFormat {
    let format: IDeviceCommandResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDeviceCommandSearchCriteria,
    format: IDeviceCommandResponseFormat
  ): AxiosPromise<IDeviceCommandNamespaceSearchResults> {
    return listDeviceCommandsByNamespace(store, criteria, format);
  }
}
</script>

<style scoped>
</style>
