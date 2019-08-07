<template>
  <device-group-element-dialog
    ref="dialog"
    title="Add Device Group Element"
    width="600"
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

import DeviceGroupElementDialog from "./DeviceGroupElementDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceGroupElement,
  IDeviceGroupElementCreateRequest
} from "sitewhere-rest-api";
import { createDeviceGroupElements } from "../../rest/sitewhere-device-groups-api";

@Component({
  components: {
    DeviceGroupElementDialog
  }
})
export default class DeviceSlotCreateDialog extends CreateDialogComponent<
  IDeviceGroupElement,
  IDeviceGroupElementCreateRequest
> {
  @Prop() token!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceGroupElement>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceGroupElement> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceGroupElementCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IDeviceGroupElementCreateRequest
  ): AxiosPromise<IDeviceGroupElement> {
    let elements: IDeviceGroupElementCreateRequest[] = [];
    elements.push(payload);
    return createDeviceGroupElements(this.$store, this.token, elements);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceGroupElement): void {}
}
</script>
