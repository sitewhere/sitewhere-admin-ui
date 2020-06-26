<template>
  <device-type-dialog
    ref="dialog"
    title="Create Device Type"
    width="600"
    resetOnOpen="true"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { createDeviceType } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import DeviceTypeDialog from "./DeviceTypeDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceType, IDeviceTypeCreateRequest } from "sitewhere-rest-api";
@Component({
  components: {
    DeviceTypeDialog
  }
})
export default class DeviceTypeCreateDialog extends CreateDialogComponent<
  IDeviceType,
  IDeviceTypeCreateRequest
> {
  @Ref() readonly dialog!: DeviceTypeDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceTypeDialog {
    return this.dialog;
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
    this.$emit("deviceTypeAdded", payload);
  }
}
</script>

<style scoped>
</style>
