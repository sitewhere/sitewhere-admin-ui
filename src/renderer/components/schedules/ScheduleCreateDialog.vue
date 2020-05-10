<template>
  <schedule-dialog
    ref="dialog"
    title="Create Schedule"
    width="700"
    resetOnOpen="true"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { createSchedule } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import ScheduleDialog from "./ScheduleDialog.vue";

import { AxiosPromise } from "axios";
import { ISchedule, IScheduleCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    ScheduleDialog
  }
})
export default class ScheduleCreateDialog extends CreateDialogComponent<
  ISchedule,
  IScheduleCreateRequest
> {
  @Ref() readonly dialog!: ScheduleDialog;

  /** Get wrapped dialog */
  getDialog(): ScheduleDialog {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IScheduleCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IScheduleCreateRequest): AxiosPromise<ISchedule> {
    return createSchedule(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ISchedule): void {}
}
</script>
