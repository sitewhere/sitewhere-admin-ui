<template>
  <device-slot-dialog
    ref="dialog"
    title="Create Device Slot"
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

import DeviceSlotDialog from "./DeviceSlotDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceType, IDeviceTypeCreateRequest } from "sitewhere-rest-api";
import { createDeviceType } from "../../rest/sitewhere-device-types-api";

@Component({
  components: {
    DeviceSlotDialog
  }
})
export default class DeviceSlotCreateDialog extends CreateDialogComponent<
  IDeviceType,
  IDeviceTypeCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceType>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceType> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceTypeCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceTypeCreateRequest): AxiosPromise<IDeviceType> {
    return createDeviceType(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceType): void {
    this.$emit("deviceSlotAdded", payload);
  }
}
</script>

<style scoped>
</style>
