<template>
  <location-dialog
    ref="dialog"
    title="Create Location"
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

import LocationDialog from "./LocationDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceLocation,
  IDeviceLocationCreateRequest
} from "sitewhere-rest-api";
import { createLocationForAssignment } from "../../../rest/sitewhere-device-assignments-api";

@Component({
  components: {
    LocationDialog
  }
})
export default class AlertCreateDialog extends CreateDialogComponent<
  IDeviceLocation,
  IDeviceLocationCreateRequest
> {
  @Prop() readonly assignment!: IDeviceAssignment;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceLocation>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceLocation> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceLocationCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceLocationCreateRequest): AxiosPromise<IDeviceLocation> {
    return createLocationForAssignment(
      this.$store,
      this.assignment.token,
      payload
    );
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceLocation): void {}
}
</script>
