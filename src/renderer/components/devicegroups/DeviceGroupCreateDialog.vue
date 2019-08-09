<template>
  <device-group-dialog
    ref="dialog"
    title="Create Device Group"
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

import DeviceGroupDialog from "./DeviceGroupDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceGroup, IDeviceGroupCreateRequest } from "sitewhere-rest-api";
import { createDeviceGroup } from "../../rest/sitewhere-device-groups-api";

@Component({
  components: {
    DeviceGroupDialog
  }
})
export default class DeviceGroupCreateDialog extends CreateDialogComponent<
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

  /** Called on payload commit */
  onCommit(payload: IDeviceGroupCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceGroupCreateRequest): AxiosPromise<IDeviceGroup> {
    return createDeviceGroup(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceGroup): void {
    this.$emit("deviceGroupAdded", payload);
  }
}
</script>

<style scoped>
</style>
