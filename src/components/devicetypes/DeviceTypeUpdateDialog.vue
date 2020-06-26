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
import { Component, Ref } from "vue-property-decorator";
import { getDeviceType, updateDeviceType } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import DeviceTypeDialog from "./DeviceTypeDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceType,
  IDeviceTypeCreateRequest,
  IDeviceTypeResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceTypeDialog
  }
})
export default class DeviceTypeUpdateDialog extends EditDialogComponent<
  IDeviceType,
  IDeviceTypeCreateRequest
> {
  @Ref() readonly dialog!: DeviceTypeDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceTypeDialog {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceType> {
    const format: IDeviceTypeResponseFormat = {
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
