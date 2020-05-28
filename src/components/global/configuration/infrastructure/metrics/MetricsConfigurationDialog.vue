<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Metrics Configuration"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <metrics-configuration-fields ref="details" />
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "sitewhere-ide-components";

import MetricsConfigurationFields from "./MetricsConfigurationFields.vue";

import { IMetricsConfiguration } from "sitewhere-rest-api";

@Component({
  components: { MetricsConfigurationFields }
})
export default class MetricsConfigurationDialog extends DialogComponent<
  IMetricsConfiguration
> {
  @Prop() readonly metrics!: IMetricsConfiguration;
  @Ref() readonly dialog!: any;
  @Ref() readonly details!: MetricsConfigurationFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IMetricsConfiguration {
    return Object.assign({}, this.metrics, this.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.details) {
      this.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IMetricsConfiguration) {
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