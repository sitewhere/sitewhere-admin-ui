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
  Prop,
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
} from "../../rest/sitewhere-device-types-api";

@Component({
  components: {
    DeviceStatusDialog
  }
})
export default class DeviceStatusUpdateDialog extends EditDialogComponent<
  IDeviceStatus,
  IDeviceStatusCreateRequest
> {
  @Prop() readonly deviceTypeToken!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceStatus>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceStatus> {
    return this.$refs.dialog;
  }

  /** Load payload */
  prepareLoad(token: string): AxiosPromise<IDeviceStatus> {
    let format: IDeviceStatusResponseFormat = {};
    return getDeviceStatus(this.$store, this.deviceTypeToken, token, format);
  }

  /** Save payload */
  prepareSave(
    original: IDeviceStatus,
    updated: IDeviceStatusCreateRequest
  ): AxiosPromise<IDeviceStatus> {
    return updateDeviceStatus(
      this.$store,
      this.deviceTypeToken,
      original.token,
      updated
    );
  }

  /** Called on payload commit */
  onSave(payload: IDeviceStatusCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceStatus): void {}
}
</script>

<style scoped>
</style>
