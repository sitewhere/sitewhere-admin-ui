<template>
  <device-type-dialog
    ref="dialog"
    title="Edit Device Type"
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

import DeviceTypeDialog from "./DeviceTypeDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceType,
  IDeviceTypeCreateRequest,
  IDeviceTypeResponseFormat
} from "sitewhere-rest-api";
import {
  getDeviceType,
  updateDeviceType
} from "../../rest/sitewhere-device-types-api";

@Component({
  components: {
    DeviceTypeDialog
  }
})
export default class DeviceTypeUpdateDialog extends EditDialogComponent<
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

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {
      includeAsset: false
    };
    return getDeviceType(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IDeviceType,
    updated: IDeviceTypeCreateRequest
  ): AxiosPromise<IDeviceType> {
    return updateDeviceType(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IDeviceTypeCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceType): void {
    this.$emit("deviceTypeUpdated", payload);
  }
}
</script>

<style scoped>
</style>
