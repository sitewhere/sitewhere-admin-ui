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
import { Component, Prop, Ref } from "vue-property-decorator";
import { createMeasurementsForAssignment } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import MeasurementDialog from "./MeasurementDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceMeasurement,
  IDeviceMeasurementCreateRequest
} from "sitewhere-rest-api";

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
  @Ref() readonly dialog!: DialogComponent<IDeviceMeasurement>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceMeasurement> {
    return this.dialog;
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
  afterSave(payload: IDeviceMeasurement): void {
    console.log(payload);
  }
}
</script>
