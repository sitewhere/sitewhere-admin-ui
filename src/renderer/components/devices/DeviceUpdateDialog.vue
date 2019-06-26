<template>
  <device-dialog
    ref="dialog"
    title="Edit Device"
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

import DeviceDialog from "./DeviceDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDevice,
  IDeviceCreateRequest,
  IDeviceResponseFormat
} from "sitewhere-rest-api";
import { getDevice, updateDevice } from "../../rest/sitewhere-devices-api";

@Component({
  components: {
    DeviceDialog
  }
})
export default class DeviceUpdateDialog extends EditDialogComponent<
  IDevice,
  IDeviceCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDevice>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDevice> {
    return this.$refs.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDevice> {
    let format: IDeviceResponseFormat = {
      includeDeviceType: true
    };
    return getDevice(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IDevice,
    updated: IDeviceCreateRequest
  ): AxiosPromise<IDevice> {
    return updateDevice(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IDeviceCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDevice): void {
    this.$emit("deviceUpdated", payload);
  }
}
</script>

<style scoped>
</style>
