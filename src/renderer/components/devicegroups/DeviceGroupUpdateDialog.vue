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
import {
  Component,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import DeviceGroupDialog from "./DeviceGroupDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceGroup,
  IDeviceGroupCreateRequest,
  IDeviceGroupResponseFormat
} from "sitewhere-rest-api";
import {
  getDeviceGroup,
  updateDeviceGroup
} from "../../rest/sitewhere-device-groups-api";

@Component({
  components: {
    DeviceGroupDialog
  }
})
export default class DeviceGroupUpdateDialog extends EditDialogComponent<
  IDeviceGroup,
  IDeviceGroupCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceGroup>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceGroup> {
    return this.$refs.dialog;
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
