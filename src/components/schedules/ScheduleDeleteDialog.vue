<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Schedule"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getSchedule, deleteSchedule } from "sitewhere-ide-common";
import { DeleteDialogComponent } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { ISchedule, IScheduleResponseFormat } from "sitewhere-rest-api";

@Component({})
export default class ScheduleDeleteDialog extends DeleteDialogComponent<
  ISchedule
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ISchedule> {
    const format: IScheduleResponseFormat = {};
    return getSchedule(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(device: ISchedule): void {
    this.message = `Are you sure you want to delete '${device.token}'?`;
  }

  /** Load payload */
  prepareDelete(item: ISchedule): AxiosPromise<ISchedule> {
    return deleteSchedule(this.$store, item.token);
  }

  /** Called after create button is clicked */
  onDelete() {
    this.delete();
  }

  /** Called after cancel button is clicked */
  onCancel() {
    this.cancel();
  }
}
</script>
