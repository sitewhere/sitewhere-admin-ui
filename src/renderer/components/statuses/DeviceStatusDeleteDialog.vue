<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Status"
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
import { IDeviceStatus, IDeviceStatusResponseFormat } from "sitewhere-rest-api";
import {
  getDeviceStatus,
  deleteDeviceStatus
} from "../../rest/sitewhere-device-types-api";

@Component({})
export default class DeviceStatusDeleteDialog extends DeleteDialogComponent<
  IDeviceStatus
> {
  @Prop() readonly deviceTypeToken!: string;

  message: string | null = null;

  /** Load payload */
  prepareLoad(token: string): AxiosPromise<IDeviceStatus> {
    let format: IDeviceStatusResponseFormat = {};
    return getDeviceStatus(this.$store, this.deviceTypeToken, token, format);
  }

  /** Called after record is loaded */
  afterLoad(status: IDeviceStatus): void {
    this.message = `Are you sure you want to delete '${status.name}'?`;
  }

  /** Load payload */
  prepareDelete(command: IDeviceStatus): AxiosPromise<IDeviceStatus> {
    return deleteDeviceStatus(this.$store, this.deviceTypeToken, command.token);
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
