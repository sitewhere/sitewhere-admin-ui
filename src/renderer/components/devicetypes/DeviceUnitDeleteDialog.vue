<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Device Unit"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, Prop, DeleteDialogComponent } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";
import { IDeviceType, IDeviceTypeResponseFormat } from "sitewhere-rest-api";
import {
  getDeviceType,
  deleteDeviceType
} from "../../rest/sitewhere-device-types-api";

@Component({})
export default class DeviceUnitDeleteDialog extends DeleteDialogComponent<
  IDeviceType
> {
  @Prop() readonly unitPath!: string;

  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {};
    return getDeviceType(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(user: IDeviceType): void {
    this.message = `Are you sure you want to delete unit '${this.unitPath}'?`;
  }

  /** Load payload */
  prepareDelete(deviceType: IDeviceType): AxiosPromise<IDeviceType> {
    return deleteDeviceType(this.$store, deviceType.token);
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

<style scoped>
</style>
