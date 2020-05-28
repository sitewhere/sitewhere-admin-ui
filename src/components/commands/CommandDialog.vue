<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="details">Details</v-tab>
      <v-tab key="parameters">Parameters</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <command-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="parameters">
        <parameters-panel ref="parameters" />
      </v-tab-item>
      <v-tab-item key="metadata">
        <metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  DialogComponent,
  DialogSection,
  BaseDialog,
  MetadataPanel
} from "sitewhere-ide-components";

import CommandDetailFields from "./CommandDetailFields.vue";
import ParametersPanel from "./ParametersPanel.vue";
import { IDeviceCommand } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    CommandDetailFields,
    ParametersPanel,
    MetadataPanel
  }
})
export default class CommandDialog extends DialogComponent<IDeviceCommand> {
  @Prop() readonly deviceTypeToken!: string;
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: CommandDetailFields;
  @Ref() readonly parameters!: ParametersPanel;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceCommand;
  }

  /** Generate payload from UI */
  generatePayload() {
    const payload: any = {
      deviceTypeToken: this.deviceTypeToken
    };
    Object.assign(
      payload,
      this.details.save(),
      this.parameters.save(),
      this.metadata.save()
    );
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.parameters) {
      this.parameters.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: IDeviceCommand) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.parameters) {
      this.parameters.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.parameters.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
