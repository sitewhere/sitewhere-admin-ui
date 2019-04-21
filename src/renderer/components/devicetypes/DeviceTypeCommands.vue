<template>
  <sw-list-tab
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
  </sw-list-tab>
</template>

<script lang="ts">
import { Component, Prop, ListComponent } from "sitewhere-ide-common";

import NoResultsPanel from "../common/NoResultsPanel.vue";
import CommandNamespaceListEntry from "../commands/CommandNamespaceListEntry.vue";

import { AxiosPromise } from "axios";
import { listDeviceCommandsByNamespace } from "../../rest/sitewhere-device-commands-api";
import {
  IDeviceType,
  IDeviceCommandNamespace,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandNamespaceSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    NoResultsPanel,
    CommandNamespaceListEntry
  }
})
export default class DeviceTypeCommands extends ListComponent<
  IDeviceCommandNamespace,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandNamespaceSearchResults
> {
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
    criteria: IDeviceCommandSearchCriteria,
    format: IDeviceCommandResponseFormat
  ): AxiosPromise<IDeviceCommandNamespaceSearchResults> {
    return listDeviceCommandsByNamespace(this.$store, criteria, format);
  }
}
</script>

<style scoped>
</style>
