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
import { Component, Prop, Ref } from "vue-property-decorator";
import { createCommandInvocationForAssignment } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import InvocationDialog from "./InvocationDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceCommandInvocation,
  IDeviceCommandInvocationCreateRequest
} from "sitewhere-rest-api";

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
  @Ref() readonly dialog!: InvocationDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceCommandInvocation> {
    return this.dialog;
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
