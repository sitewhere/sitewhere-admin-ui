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
import { Component, Ref } from "vue-property-decorator";
import { createDeviceGroup } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import DeviceGroupDialog from "./DeviceGroupDialog.vue";

import { AxiosPromise } from "axios";
import { IDeviceGroup, IDeviceGroupCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceGroupDialog
  }
})
export default class DeviceGroupCreateDialog extends CreateDialogComponent<
  IDeviceGroup,
  IDeviceGroupCreateRequest
> {
  @Ref() readonly dialog!: DeviceGroupDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceGroupDialog {
    return this.dialog;
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
