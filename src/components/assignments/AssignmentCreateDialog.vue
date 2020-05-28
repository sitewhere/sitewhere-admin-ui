<template>
  <assignment-dialog
    ref="dialog"
    title="Create Device Assignment"
    :device="device"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { createDeviceAssignment } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import AssignmentDialog from "./AssignmentDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceAssignmentCreateRequest,
  IDevice
} from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentDialog
  }
})
export default class AssignmentCreateDialog extends CreateDialogComponent<
  IDeviceAssignment,
  IDeviceAssignmentCreateRequest
> {
  @Prop() readonly device!: IDevice;
  @Ref() readonly dialog!: AssignmentDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceAssignment> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceAssignmentCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IDeviceAssignmentCreateRequest
  ): AxiosPromise<IDeviceAssignment> {
    if (this.device) {
      payload.deviceToken = this.device.token;
    }
    return createDeviceAssignment(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceAssignment): void {
    console.log(payload);
  }
}
</script>
