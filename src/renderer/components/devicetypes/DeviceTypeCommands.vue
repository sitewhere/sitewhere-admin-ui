<template>
  <sw-list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device commands..."
    :results="results"
  >
    <sw-list-layout>
      <v-flex xs12 v-for="command in matches" :key="command.token">
        <command-panel :command="command" @delete="onDeleteCommand" @edit="onEditCommand"/>
      </v-flex>
    </sw-list-layout>
    <template slot="dialogs">
      <command-update-dialog ref="edit" @commandUpdated="refresh"/>
    </template>
  </sw-list-tab>
</template>

<script lang="ts">
import { Component, Prop, Refs, ListComponent } from "sitewhere-ide-common";

import NoResultsPanel from "../common/NoResultsPanel.vue";
import CommandPanel from "../commands/CommandPanel.vue";
import CommandUpdateDialog from "../commands/CommandUpdateDialog.vue";

import { AxiosPromise } from "axios";
import { listDeviceCommands } from "../../rest/sitewhere-device-commands-api";
import {
  IDeviceCommand,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    NoResultsPanel,
    CommandPanel,
    CommandUpdateDialog
  }
})
export default class DeviceTypeCommands extends ListComponent<
  IDeviceCommand,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceTypeToken!: string;

  // References.
  $refs!: Refs<{
    edit: CommandUpdateDialog;
  }>;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceCommandSearchCriteria {
    let criteria: IDeviceCommandSearchCriteria = {};
    criteria.deviceTypeToken = this.deviceTypeToken;
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
  ): AxiosPromise<IDeviceCommandSearchResults> {
    return listDeviceCommands(this.$store, criteria, format);
  }

  /** Edit an existing command */
  onEditCommand(command: IDeviceCommand) {
    console.log("Edit command");
    this.$refs.edit.open(command.token);
  }

  /** Delete an existing command */
  onDeleteCommand(command: IDeviceCommand) {}
}
</script>

<style scoped>
</style>
