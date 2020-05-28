<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Kafka Configuration"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <kafka-configuration-fields ref="details" />
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "sitewhere-ide-components";

import KafkaConfigurationFields from "./KafkaConfigurationFields.vue";

import { IKafkaConfiguration } from "sitewhere-rest-api";

@Component({
  components: { KafkaConfigurationFields }
})
export default class KafkaConfigurationDialog extends DialogComponent<
  IKafkaConfiguration
> {
  @Prop() readonly kafka!: IKafkaConfiguration;
  @Ref() readonly dialog!: any;
  @Ref() readonly details!: KafkaConfigurationFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IKafkaConfiguration {
    return Object.assign({}, this.kafka, this.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.details) {
      this.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IKafkaConfiguration) {
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
