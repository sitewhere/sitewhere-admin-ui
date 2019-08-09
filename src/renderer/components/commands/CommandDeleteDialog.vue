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
import { Component, DeleteDialogComponent, Prop } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";
import {
  IDeviceCommand,
  IDeviceCommandResponseFormat
} from "sitewhere-rest-api";
import {
  getDeviceCommand,
  deleteDeviceCommand
} from "../../rest/sitewhere-device-types-api";

@Component({})
export default class CommandDeleteDialog extends DeleteDialogComponent<
  IDeviceCommand
> {
  @Prop() readonly deviceTypeToken!: string;

  message: string | null = null;

  /** Load payload */
  prepareLoad(token: string): AxiosPromise<IDeviceCommand> {
    let format: IDeviceCommandResponseFormat = {};
    return getDeviceCommand(this.$store, this.deviceTypeToken, token, format);
  }

  /** Called after record is loaded */
  afterLoad(command: IDeviceCommand): void {
    this.message = `Are you sure you want to delete '${command.name}'?`;
  }

  /** Load payload */
  prepareDelete(command: IDeviceCommand): AxiosPromise<IDeviceCommand> {
    return deleteDeviceCommand(
      this.$store,
      this.deviceTypeToken,
      command.token
    );
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
