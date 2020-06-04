<template>
  <settings-dialog
    ref="dialog"
    title="Create Device Type Mapping Router"
    createLabel="Create"
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
export default class SettingsCreateDialog extends Vue {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Ref() readonly dialog!: SettingsDialog;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: IDeviceTypeMappingRouterConfiguration): void {
    this.dialog.closeDialog();
    this.$emit("create", payload);
  }

  /** Open dialog */
  openDialog(): void {
    this.dialog.reset();
    this.dialog.openDialog();
  }
}
</script>
