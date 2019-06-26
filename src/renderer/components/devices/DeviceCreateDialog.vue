<template>
  <device-dialog
    ref="dialog"
    title="Create Device"
    width="600"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import DeviceDialog from "./DeviceDialog.vue";

import { AxiosPromise } from "axios";
import { IDevice, IDeviceCreateRequest } from "sitewhere-rest-api";
import { createDevice } from "../../rest/sitewhere-devices-api";

@Component({
  components: {
    DeviceDialog
  }
})
export default class DeviceCreateDialog extends CreateDialogComponent<
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

  /** Called on payload commit */
  onCommit(payload: IDeviceCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceCreateRequest): AxiosPromise<IDevice> {
    return createDevice(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDevice): void {
    this.$emit("deviceAdded", payload);
  }
}
</script>

<style scoped>
</style>
