<template>
  <delete-dialog
    ref="dialog"
    title="Delete Device Group"
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
import { getDeviceGroup, deleteDeviceGroup } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IDeviceGroup, IDeviceGroupResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class DeviceGroupDeleteDialog extends DeleteDialogComponent<
  IDeviceGroup
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceGroup> {
    const format: IDeviceGroupResponseFormat = {};
    return getDeviceGroup(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(deviceGroup: IDeviceGroup): void {
    this.message = `Are you sure you want to delete '${deviceGroup.name}'?`;
  }

  /** Load payload */
  prepareDelete(deviceGroup: IDeviceGroup): AxiosPromise<IDeviceGroup> {
    return deleteDeviceGroup(this.$store, deviceGroup.token);
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
