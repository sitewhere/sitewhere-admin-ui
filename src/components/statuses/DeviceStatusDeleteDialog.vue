<template>
  <delete-dialog
    ref="dialog"
    title="Delete Status"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </delete-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { getDeviceStatus, deleteDeviceStatus } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IDeviceStatus, IDeviceStatusResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class DeviceStatusDeleteDialog extends DeleteDialogComponent<
  IDeviceStatus
> {
  @Prop() readonly deviceTypeToken!: string;

  message: string | null = null;

  /** Load payload */
  prepareLoad(token: string): AxiosPromise<IDeviceStatus> {
    const format: IDeviceStatusResponseFormat = {};
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
  onDelete() {
    this.delete();
  }

  /** Called after cancel button is clicked */
  onCancel() {
    this.cancel();
  }
}
</script>
