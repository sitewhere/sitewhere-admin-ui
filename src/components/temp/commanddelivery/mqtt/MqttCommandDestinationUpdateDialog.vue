<template>
  <mqtt-command-destination-dialog
    ref="dialog"
    title="Update MQTT Command Destination"
    width="700"
    createLabel="Update"
    cancelLabel="Cancel"
    :idsInUse="idsInUse"
    :tenantId="tenantId"
    @payload="onPayload"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import MqttCommandDestinationDialog from "./MqttCommandDestinationDialog.vue";

import { ICommandDestinationGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    MqttCommandDestinationDialog
  }
})
export default class MqttCommandDestinationUpdateDialog extends Vue {
  @Prop() readonly tenantId!: string;
  @Ref() readonly dialog!: MqttCommandDestinationDialog;

  originalId: string | null = null;
  idsInUse: string[] = [];

  /** Emit payload */
  onPayload(config: ICommandDestinationGenericConfiguration): void {
    this.dialog.closeDialog();
    this.$emit("update", this.originalId, config);
  }

  /** Open dialog */
  openDialog(
    config: ICommandDestinationGenericConfiguration,
    idsInUse: string[]
  ): void {
    this.originalId = config.id;
    this.idsInUse = idsInUse;
    this.dialog.reset();
    this.dialog.openDialog();
    this.dialog.load(config);
  }
}
</script>

