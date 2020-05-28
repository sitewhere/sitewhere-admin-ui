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
import { Component, Prop, Ref } from "vue-property-decorator";
import { createDeviceStatus } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import DeviceStatusDialog from "./DeviceStatusDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceStatus, IDeviceStatusCreateRequest } from "sitewhere-rest-api";

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
  @Ref() readonly dialog!: DeviceStatusDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceStatusDialog {
    return this.dialog;
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
