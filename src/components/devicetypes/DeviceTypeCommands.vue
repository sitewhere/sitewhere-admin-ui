<template>
  <data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading commands ..."
  >
    <template slot="item" slot-scope="props">
      <tr>
        <td width="45%" :title="props.item.type">
          <command-html :command="props.item" />
        </td>
        <td width="50%" :title="props.item.message">{{ props.item.description }}</td>
        <td width="75px" class="actions-block">
          <actions-block @edit="onEditCommand(props.item)" @delete="onDeleteCommand(props.item)" />
        </td>
      </tr>
    </template>
    <template slot="dialogs">
      <command-update-dialog ref="edit" :deviceTypeToken="deviceTypeToken" @updated="refresh" />
      <command-delete-dialog ref="delete" :deviceTypeToken="deviceTypeToken" @deleted="refresh" />
    </template>
  </data-table-tab>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { listDeviceCommands, ITableHeaders } from "sitewhere-ide-common";
import { ListComponent, DataTableTab } from "sitewhere-ide-components";

import ActionsBlock from "../common/ActionsBlock.vue";
import CommandHtml from "../commands/CommandHtml.vue";
import CommandUpdateDialog from "../commands/CommandUpdateDialog.vue";
import CommandDeleteDialog from "../commands/CommandDeleteDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceCommand,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandSearchResults,
} from "sitewhere-rest-api";

@Component({
  components: {
    DataTableTab,
    ActionsBlock,
    CommandHtml,
    CommandUpdateDialog,
    CommandDeleteDialog,
  },
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

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Signature",
      value: "name",
    },
    {
      align: "left",
      sortable: false,
      text: "Description",
      value: "description",
    },
    {
      align: "left",
      sortable: false,
      text: "",
      value: "actions",
    },
  ];
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
.actions-block {
  vertical-align: top;
  margin-top: 8px;
}
</style>