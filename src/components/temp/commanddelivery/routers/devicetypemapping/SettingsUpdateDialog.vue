<template>
  <settings-dialog
    ref="dialog"
    title="Update Device Type Mapping Router"
    createLabel="Update"
    :destinations="destinations"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import SettingsDialog from "./SettingsDialog.vue";

import {
  ICommandDestinationGenericConfiguration,
  IDeviceTypeMappingRouterConfiguration
} from "sitewhere-configuration-model";

@Component({
  components: {
    SettingsDialog
  }
})
export default class SettingsUpdateDialog extends Vue {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Ref() readonly dialog!: SettingsDialog;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: IDeviceTypeMappingRouterConfiguration): void {
    this.dialog.closeDialog();
    this.$emit("update", payload);
  }

  /** Open dialog for edit */
  openDialog(config: IDeviceTypeMappingRouterConfiguration): void {
    this.dialog.reset();
    this.dialog.openDialog();
    this.dialog.load(config);
  }
}
</script>
