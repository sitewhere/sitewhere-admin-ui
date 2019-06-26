<template>
  <invocation-dialog
    :assignmentToken="assignmentToken"
    :deviceTypeToken="deviceTypeToken"
    ref="dialog"
    title="Invoke Device Command"
    width="600"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  Prop,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import InvocationDialog from "./InvocationDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceCommandInvocation,
  IDeviceCommandInvocationCreateRequest
} from "sitewhere-rest-api";
import { createCommandInvocationForAssignment } from "../../rest/sitewhere-device-assignments-api";

@Component({
  components: {
    InvocationDialog
  }
})
export default class InvocationCreateDialog extends CreateDialogComponent<
  IDeviceCommandInvocation,
  IDeviceCommandInvocationCreateRequest
> {
  @Prop() readonly assignmentToken!: string;
  @Prop() readonly deviceTypeToken!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceCommandInvocation>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceCommandInvocation> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceCommandInvocationCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IDeviceCommandInvocationCreateRequest
  ): AxiosPromise<IDeviceCommandInvocation> {
    if (!this.assignmentToken) {
      throw new Error("No assignment token set.");
    }
    return createCommandInvocationForAssignment(
      this.$store,
      this.assignmentToken,
      payload
    );
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceCommandInvocation): void {
    this.$emit("invocationAdded", payload);
  }
}
</script>
