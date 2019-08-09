<template>
  <device-status-dialog
    ref="dialog"
    title="Create Device Status"
    createLabel="Create"
    cancelLabel="Cancel"
    :deviceTypeToken="deviceTypeToken"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  Prop,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import DeviceStatusDialog from "./DeviceStatusDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceStatus, IDeviceStatusCreateRequest } from "sitewhere-rest-api";
import { createDeviceStatus } from "../../rest/sitewhere-device-types-api";

@Component({
  components: {
    DeviceStatusDialog
  }
})
export default class DeviceStatusCreateDialog extends CreateDialogComponent<
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

  /** Called on payload commit */
  onCommit(payload: IDeviceStatusCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceStatusCreateRequest): AxiosPromise<IDeviceStatus> {
    return createDeviceStatus(this.$store, this.deviceTypeToken, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceStatus): void {
    this.$emit("statusAdded", payload);
  }
}
</script>

<style scoped>
</style>
