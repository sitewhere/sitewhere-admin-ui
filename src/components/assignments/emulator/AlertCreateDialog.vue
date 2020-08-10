<template>
  <alert-dialog
    ref="dialog"
    title="Create Alert"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { createAlertForAssignment } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import AlertDialog from "./AlertDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceAlert,
  IDeviceAlertCreateRequest
} from "sitewhere-rest-api";

@Component({
  components: {
    AlertDialog
  }
})
export default class AlertCreateDialog extends CreateDialogComponent<
  IDeviceAlert,
  IDeviceAlertCreateRequest
> {
  @Prop() readonly assignment!: IDeviceAssignment;
  @Ref() readonly dialog!: AlertDialog;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceAlert> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceAlertCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceAlertCreateRequest): AxiosPromise<IDeviceAlert> {
    return createAlertForAssignment(
      this.$store,
      this.assignment.token,
      payload
    );
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceAlert): void {
    console.log(payload);
  }
}
</script>
