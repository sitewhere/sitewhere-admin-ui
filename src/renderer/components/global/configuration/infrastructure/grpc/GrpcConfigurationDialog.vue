<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit gRPC Configuration"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <grpc-configuration-fields ref="details" />
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Refs, Prop, DialogComponent } from "sitewhere-ide-common";
import { NavigationIcon } from "../../../../../libraries/constants";

import GrpcConfigurationFields from "./GrpcConfigurationFields.vue";

import { IGrpcConfiguration } from "sitewhere-rest-api";

@Component({
  components: { GrpcConfigurationFields }
})
export default class GrpcConfigurationDialog extends DialogComponent<
  IGrpcConfiguration
> {
  @Prop() readonly grpc!: IGrpcConfiguration;

  // References.
  $refs!: Refs<{
    dialog: any;
    details: GrpcConfigurationFields;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IGrpcConfiguration {
    return Object.assign({}, this.grpc, this.$refs.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IGrpcConfiguration) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
  }

  /** Called after update button is clicked */
  onUpdateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
    this.dialogVisible = false;
  }
}
</script>

<style scoped></style>
