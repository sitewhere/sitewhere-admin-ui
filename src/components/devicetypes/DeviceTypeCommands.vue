<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device commands..."
    :results="results"
  >
    <list-layout>
      <v-flex xs12 v-for="command in matches" :key="command.token">
        <command-panel :command="command" @delete="onDeleteCommand" @edit="onEditCommand" />
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <command-update-dialog ref="edit" :deviceTypeToken="deviceTypeToken" @updated="refresh" />
      <command-delete-dialog ref="delete" :deviceTypeToken="deviceTypeToken" @deleted="refresh" />
    </template>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { listDeviceCommands } from "sitewhere-ide-common";
import { ListComponent, ListTab, ListLayout } from "sitewhere-ide-components";

import CommandPanel from "../commands/CommandPanel.vue";
import CommandUpdateDialog from "../commands/CommandUpdateDialog.vue";
import CommandDeleteDialog from "../commands/CommandDeleteDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceCommand,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListTab,
    ListLayout,
    CommandPanel,
    CommandUpdateDialog,
    CommandDeleteDialog
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
  @Ref() readonly edit!: CommandUpdateDialog;
  @Ref() readonly delete!: CommandDeleteDialog;

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceCommandSearchCriteria {
    const criteria: IDeviceCommandSearchCriteria = {};
    criteria.deviceTypeToken = this.deviceTypeToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceCommandResponseFormat {
    const format: IDeviceCommandResponseFormat = {};
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
    this.edit.open(command.token);
  }

  /** Delete an existing command */
  onDeleteCommand(command: IDeviceCommand) {
    this.delete.open(command.token);
  }
}
</script>

<style scoped>
</style>