<template>
  <delete-dialog
    ref="dialog"
    title="Delete Device Unit"
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
import { getDeviceType, deleteDeviceType } from "sitewhere-ide-common";

import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IDeviceType, IDeviceTypeResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class DeviceUnitDeleteDialog extends DeleteDialogComponent<
  IDeviceType
> {
  @Prop() readonly unitPath!: string;

  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceType> {
    const format: IDeviceTypeResponseFormat = {};
    return getDeviceType(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(): void {
    this.message = `Are you sure you want to delete unit '${this.unitPath}'?`;
  }

  /** Load payload */
  prepareDelete(deviceType: IDeviceType): AxiosPromise<IDeviceType> {
    return deleteDeviceType(this.$store, deviceType.token);
  }

  // Called after create button is clicked.
  onDelete() {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel() {
    this.cancel();
  }
}
</script>
