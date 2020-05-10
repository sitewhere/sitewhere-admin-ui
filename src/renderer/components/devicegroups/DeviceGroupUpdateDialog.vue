<template>
  <device-group-dialog
    ref="dialog"
    title="Edit Device Group"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getDeviceGroup, updateDeviceGroup } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import DeviceGroupDialog from "./DeviceGroupDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceGroup,
  IDeviceGroupCreateRequest,
  IDeviceGroupResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceGroupDialog
  }
})
export default class DeviceGroupUpdateDialog extends EditDialogComponent<
  IDeviceGroup,
  IDeviceGroupCreateRequest
> {
  @Ref() readonly dialog!: DeviceGroupDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceGroupDialog {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceGroup> {
    let format: IDeviceGroupResponseFormat = {};
    return getDeviceGroup(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IDeviceGroup,
    updated: IDeviceGroupCreateRequest
  ): AxiosPromise<IDeviceGroup> {
    return updateDeviceGroup(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IDeviceGroupCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceGroup): void {
    this.$emit("deviceGroupUpdated", payload);
  }
}
</script>

<style scoped>
</style>
