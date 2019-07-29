<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Device Assignment"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, DeleteDialogComponent } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";

import {
  IDeviceAssignment,
  IDeviceAssignmentResponseFormat
} from "sitewhere-rest-api";
import {
  getDeviceAssignment,
  deleteDeviceAssignment
} from "../../rest/sitewhere-device-assignments-api";

@Component({})
export default class AssignmentDeleteDialog extends DeleteDialogComponent<
  IDeviceAssignment
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceAssignment> {
    let format: IDeviceAssignmentResponseFormat = {};
    return getDeviceAssignment(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(item: IDeviceAssignment): void {
    this.message = `Are you sure you want to delete '${item.token}'?`;
  }

  /** Load payload */
  prepareDelete(item: IDeviceAssignment): AxiosPromise<IDeviceAssignment> {
    return deleteDeviceAssignment(this.$store, item.token);
  }

  // Called after create button is clicked.
  onDelete(e: any) {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel(e: any) {
    this.cancel();
  }
}
</script>
