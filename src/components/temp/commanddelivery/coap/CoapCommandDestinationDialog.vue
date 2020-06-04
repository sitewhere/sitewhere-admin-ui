<template>
  <command-destination-dialog
    ref="dialog"
    type="coap"
    :tenantId="tenantId"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="true"
    :idsInUse="idsInUse"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    :parameterExtractors="parameterExtractors"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="command-destination-tabs">
      <v-tab key="coap">Configuration</v-tab>
    </template>
    <template slot="command-destination-tab-items">
      <v-tab-item key="coap">
        <coap-fields ref="coap" />
      </v-tab-item>
    </template>
  </command-destination-dialog>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { MicroserviceIcon } from "sitewhere-ide-common";

import { DialogComponent } from "sitewhere-ide-components";
import { VTab, VTabItem } from "vuetify/lib";
import CommandDestinationDialog from "../CommandDestinationDialog.vue";
import CoapFields from "./CoapFields.vue";

import { ICommandDestinationGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: { VTab, VTabItem, CommandDestinationDialog, CoapFields }
})
export default class CoapCommandDestinationDialog extends DialogComponent<
  ICommandDestinationGenericConfiguration
> {
  @Prop() readonly tenantId!: string;
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly idsInUse!: string[];
  @Ref() readonly dialog!: CommandDestinationDialog;
  @Ref() readonly coap!: CoapFields;

  /** List of parameter extractors */
  parameterExtractors: { text: string; value: string }[] = [
    {
      text: "Metadata Extractor",
      value: "coap-default"
    }
  ];

  /** Get icon for dialog */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Generate payload from UI */
  generatePayload() {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const config: any = {};
    Object.assign(config, this.coap.save());

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const payload: any = {};
    Object.assign(payload, this.dialog.save());
    payload.configuration = config;

    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.coap) {
      this.coap.reset();
    }
    this.dialog.reset();
  }

  /** Load dialog from a given configuration */
  load(config: ICommandDestinationGenericConfiguration) {
    this.reset();
    if (this.dialog) {
      this.dialog.load(config);
    }
    if (this.coap) {
      this.coap.load(config.configuration);
    }
  }

  /** Called after create button is clicked */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
  onCreateClicked(e: any) {
    if (!this.dialog.validate()) {
      return;
    }
    if (!this.coap.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
