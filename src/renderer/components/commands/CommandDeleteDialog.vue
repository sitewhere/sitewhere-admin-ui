<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Command"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, DeleteDialogComponent } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";
import {
  IDeviceCommand,
  IDeviceCommandResponseFormat
} from "sitewhere-rest-api";
import {
  getDeviceCommand,
  deleteDeviceCommand
} from "../../rest/sitewhere-device-commands-api";

@Component({})
export default class CommandDeleteDialog extends DeleteDialogComponent<
  IDeviceCommand
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceCommand> {
    let format: IDeviceCommandResponseFormat = {};
    return getDeviceCommand(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(command: IDeviceCommand): void {
    this.message = `Are you sure you want to delete '${command.name}'?`;
  }

  /** Load payload */
  prepareDelete(command: IDeviceCommand): AxiosPromise<IDeviceCommand> {
    return deleteDeviceCommand(this.$store, command.token);
  }

  /** Called after create button is clicked */
  onDelete(e: any) {
    this.delete();
  }

  /** Called after cancel button is clicked */
  onCancel(e: any) {
    this.cancel();
  }
}
</script>
