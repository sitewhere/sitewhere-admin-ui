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
import { Component, Prop, Ref } from "vue-property-decorator";
import { createLocationForAssignment } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import LocationDialog from "./LocationDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceLocation,
  IDeviceLocationCreateRequest
} from "sitewhere-rest-api";

@Component({
  components: {
    LocationDialog
  }
})
export default class LocationCreateDialog extends CreateDialogComponent<
  IDeviceLocation,
  IDeviceLocationCreateRequest
> {
  @Prop() readonly assignment!: IDeviceAssignment;
  @Ref() readonly dialog!: DialogComponent<IDeviceLocation>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceLocation> {
    return this.dialog;
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
  afterSave(payload: IDeviceLocation): void {
    console.log(payload);
  }
}
</script>
