<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Device"
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
import { IDevice, IDeviceResponseFormat } from "sitewhere-rest-api";
import { getDevice, deleteDevice } from "../../rest/sitewhere-devices-api";

@Component({})
export default class DeviceDeleteDialog extends DeleteDialogComponent<IDevice> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDevice> {
    let format: IDeviceResponseFormat = {};
    return getDevice(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(device: IDevice): void {
    this.message = `Are you sure you want to delete '${device.token}'?`;
  }

  /** Load payload */
  prepareDelete(device: IDevice): AxiosPromise<IDevice> {
    return deleteDevice(this.$store, device.token);
  }

  // Called after create button is clicked.
  onDelete(e: any) {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel(e: any) {
    this.cancel();
  }
}
</script>
