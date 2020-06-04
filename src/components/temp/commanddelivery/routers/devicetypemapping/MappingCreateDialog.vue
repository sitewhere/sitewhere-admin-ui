<template>
  <mapping-dialog
    ref="dialog"
    title="Create Device Type Mapping"
    createLabel="Create"
    :destinations="destinations"
    :deviceTypes="deviceTypes"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import MappingDialog from "./MappingDialog.vue";

import {
  ICommandDestinationGenericConfiguration,
  IDeviceTypeMapping
} from "sitewhere-configuration-model";
import { IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    MappingDialog
  }
})
export default class MappingCreateDialog extends Vue {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Prop() readonly deviceTypes!: IDeviceType[];
  @Ref() readonly dialog!: MappingDialog;

  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(payload: IDeviceTypeMapping): void {
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
