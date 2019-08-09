<template>
  <measurement-dialog
    ref="dialog"
    title="Create Measurement"
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

import MeasurementDialog from "./MeasurementDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceMeasurement,
  IDeviceMeasurementCreateRequest
} from "sitewhere-rest-api";
import { createMeasurementsForAssignment } from "../../../rest/sitewhere-device-assignments-api";

@Component({
  components: {
    MeasurementDialog
  }
})
export default class MeasurementCreateDialog extends CreateDialogComponent<
  IDeviceMeasurement,
  IDeviceMeasurementCreateRequest
> {
  @Prop() readonly assignment!: IDeviceAssignment;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceMeasurement>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceMeasurement> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceMeasurementCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IDeviceMeasurementCreateRequest
  ): AxiosPromise<IDeviceMeasurement> {
    return createMeasurementsForAssignment(
      this.$store,
      this.assignment.token,
      payload
    );
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceMeasurement): void {}
}
</script>
