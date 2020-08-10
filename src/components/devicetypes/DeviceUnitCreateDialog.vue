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
import { Component, Ref } from "vue-property-decorator";
import { createDeviceType } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import DeviceUnitDialog from "./DeviceUnitDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceType, IDeviceTypeCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceUnitDialog
  }
})
export default class DeviceUnitCreateDialog extends CreateDialogComponent<
  IDeviceType,
  IDeviceTypeCreateRequest
> {
  @Ref() readonly dialog!: DeviceUnitDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceUnitDialog {
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
    this.$emit("deviceUnitAdded", payload);
  }
}
</script>

<style scoped>
</style>
