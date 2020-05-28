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
import { Component, Prop, Ref } from "vue-property-decorator";
import { createDeviceGroupElements } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import DeviceGroupElementDialog from "./DeviceGroupElementDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceGroupElement,
  IDeviceGroupElementCreateRequest
} from "sitewhere-rest-api";

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
  @Ref() readonly dialog!: DeviceGroupElementDialog;

  /** Get wrapped dialog */
  getDialog(): DeviceGroupElementDialog {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceGroupElementCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IDeviceGroupElementCreateRequest
  ): AxiosPromise<IDeviceGroupElement> {
    const elements: IDeviceGroupElementCreateRequest[] = [];
    elements.push(payload);
    return createDeviceGroupElements(this.$store, this.token, elements);
  }

  /** Implemented in subclasses for after-save */
  afterSave(): void {}
}
</script>
