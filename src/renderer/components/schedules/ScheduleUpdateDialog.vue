<template>
  <schedule-dialog
    ref="dialog"
    title="Edit Schedule"
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

import ScheduleDialog from "./ScheduleDialog.vue";

import { AxiosPromise } from "axios";
import {
  ISchedule,
  IScheduleCreateRequest,
  IScheduleResponseFormat
} from "sitewhere-rest-api";
import {
  getSchedule,
  updateSchedule
} from "../../rest/sitewhere-schedules-api";

@Component({
  components: {
    ScheduleDialog
  }
})
export default class ScheduleUpdateDialog extends EditDialogComponent<
  ISchedule,
  IScheduleCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<ISchedule>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<ISchedule> {
    return this.$refs.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ISchedule> {
    let format: IScheduleResponseFormat = {};
    return getSchedule(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: ISchedule,
    updated: IScheduleCreateRequest
  ): AxiosPromise<ISchedule> {
    return updateSchedule(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: IScheduleCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ISchedule): void {}
}
</script>
