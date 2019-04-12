<template>
  <command-dialog
    ref="dialog"
    title="Create Command"
    createLabel="Create"
    cancelLabel="Cancel"
    deviceTypeToken
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  CreateDialogComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";
import { Refs } from "../../libraries/navigation-model";

import CommandDialog from "./CommandDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceCommand,
  IDeviceCommandCreateRequest
} from "sitewhere-rest-api";
import { createDeviceCommand } from "../../rest/sitewhere-device-commands-api";

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

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceCommand>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceCommand> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceCommandCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IDeviceCommandCreateRequest): AxiosPromise<IDeviceCommand> {
    return createDeviceCommand(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceCommand): void {
    this.$emit("commandAdded", payload);
  }
}
</script>

<style scoped>
</style>
