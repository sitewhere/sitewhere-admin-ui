<template>
  <device-status-dialog
    ref="dialog"
    title="Edit Device Status"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import {
  Component,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import DeviceStatusDialog from "./DeviceStatusDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceStatus,
  IDeviceStatusCreateRequest,
  IDeviceStatusResponseFormat
} from "sitewhere-rest-api";
import {
  getDeviceStatus,
  updateDeviceStatus
} from "../../rest/sitewhere-device-statuses-api";

@Component({
  components: {
    DeviceStatusDialog
  }
})
export default class DeviceStatusUpdateDialog extends EditDialogComponent<
  IDeviceStatus,
  IDeviceStatusCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceStatus>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceStatus> {
    return this.$refs.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceStatus> {
    let format: IDeviceStatusResponseFormat = {};
    return getDeviceStatus(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IDeviceStatus,
    updated: IDeviceStatusCreateRequest
  ): AxiosPromise<IDeviceStatus> {
    return updateDeviceStatus(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IDeviceStatusCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceStatus): void {
    this.$emit("deviceStatusUpdated", payload);
  }
}
</script>

<style scoped>
</style>
