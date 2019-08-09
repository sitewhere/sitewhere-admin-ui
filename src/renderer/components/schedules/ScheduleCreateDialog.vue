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
import {
  Component,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import ScheduleDialog from "./ScheduleDialog.vue";

import { AxiosPromise } from "axios";
import { ISchedule, IScheduleCreateRequest } from "sitewhere-rest-api";
import { createSchedule } from "../../rest/sitewhere-schedules-api";

@Component({
  components: {
    ScheduleDialog
  }
})
export default class ScheduleCreateDialog extends CreateDialogComponent<
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
