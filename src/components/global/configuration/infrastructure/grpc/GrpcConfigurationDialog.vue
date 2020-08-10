<template>
  <base-dialog
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
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent, BaseDialog } from "sitewhere-ide-components";

import GrpcConfigurationFields from "./GrpcConfigurationFields.vue";

import { IGrpcConfiguration } from "sitewhere-rest-api";

@Component({
  components: { BaseDialog, GrpcConfigurationFields }
})
export default class GrpcConfigurationDialog extends DialogComponent<
  IGrpcConfiguration
> {
  @Prop() readonly grpc!: IGrpcConfiguration;
  @Ref() readonly dialog!: any;
  @Ref() readonly details!: GrpcConfigurationFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IGrpcConfiguration {
    return Object.assign({}, this.grpc, this.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.details) {
      this.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IGrpcConfiguration) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
  }

  /** Called after update button is clicked */
  onUpdateClicked() {
    if (!this.details.validate()) {
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
    this.dialogVisible = false;
  }
}
</script>

<style scoped></style>
