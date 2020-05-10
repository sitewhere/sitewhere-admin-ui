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
import { Component, Prop, Ref } from "vue-property-decorator";
import { getDeviceStatus, updateDeviceStatus } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import DeviceStatusDialog from "./DeviceStatusDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceStatus,
  IDeviceStatusCreateRequest,
  IDeviceStatusResponseFormat
} from "sitewhere-rest-api";

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
  @Ref() readonly dialog!: DeviceStatusDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceStatusDialog {
    return this.dialog;
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
