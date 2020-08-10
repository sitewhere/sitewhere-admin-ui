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
import { Component, Ref } from "vue-property-decorator";
import { getSchedule, updateSchedule } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import ScheduleDialog from "./ScheduleDialog.vue";

import { AxiosPromise } from "axios";
import {
  ISchedule,
  IScheduleCreateRequest,
  IScheduleResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    ScheduleDialog
  }
})
export default class ScheduleUpdateDialog extends EditDialogComponent<
  ISchedule,
  IScheduleCreateRequest
> {
  @Ref() readonly dialog!: ScheduleDialog;

  /** Get wrapped dialog */
  getDialog(): ScheduleDialog {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ISchedule> {
    const format: IScheduleResponseFormat = {};
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
  afterSave(payload: ISchedule): void {
    console.log(payload);
  }
}
</script>
