<template>
  <device-unit-dialog
    ref="dialog"
    title="Create Device Unit"
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

import DeviceUnitDialog from "./DeviceUnitDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceType, IDeviceTypeCreateRequest } from "sitewhere-rest-api";
import { createDeviceType } from "../../rest/sitewhere-device-types-api";

@Component({
  components: {
    DeviceUnitDialog
  }
})
export default class DeviceUnitCreateDialog extends CreateDialogComponent<
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
    this.$emit("deviceUnitAdded", payload);
  }
}
</script>

<style scoped>
</style>
