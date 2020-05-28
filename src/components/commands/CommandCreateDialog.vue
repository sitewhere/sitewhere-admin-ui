<template>
  <command-dialog
    ref="dialog"
    title="Create Command"
    createLabel="Create"
    cancelLabel="Cancel"
    :deviceTypeToken="deviceTypeToken"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { createDeviceCommand } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import CommandDialog from "./CommandDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceCommand,
  IDeviceCommandCreateRequest
} from "sitewhere-rest-api";

@Component({
  components: {
    CommandDialog
  }
})
export default class CommandCreateDialog extends CreateDialogComponent<
  IDeviceCommand,
  IDeviceCommandCreateRequest
> {
  @Prop() readonly deviceTypeToken!: string;
  @Ref() readonly dialog!: DialogComponent<IDeviceCommand>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceCommand> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceCommandCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceCommandCreateRequest): AxiosPromise<IDeviceCommand> {
    return createDeviceCommand(this.$store, this.deviceTypeToken, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceCommand): void {
    this.$emit("commandAdded", payload);
  }
}
</script>
