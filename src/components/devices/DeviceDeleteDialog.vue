<template>
  <delete-dialog
    ref="dialog"
    title="Delete Device"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </delete-dialog>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getDevice, deleteDevice } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IDevice, IDeviceResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class DeviceDeleteDialog extends DeleteDialogComponent<IDevice> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDevice> {
    const format: IDeviceResponseFormat = {};
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

  /** Called after delete button is clicked */
  onDelete() {
    this.delete();
  }

  /** Called after cancel button is clicked */
  onCancel() {
    this.cancel();
  }
}
</script>
