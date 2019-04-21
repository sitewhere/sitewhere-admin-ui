<template>
  <sw-base-dialog
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
      <v-tab key="details" href="#details">Details</v-tab>
      <v-tab key="parameters" href="#parameters">Parameters</v-tab>
      <v-tab key="metadata" href="#metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" id="details">
        <command-detail-fields ref="details"/>
      </v-tab-item>
      <v-tab-item key="parameters" id="parameters">
        <parameters-panel ref="parameters"/>
      </v-tab-item>
      <v-tab-item key="metadata" id="metadata">
        <metadata-panel ref="metadata"/>
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import CommandDetailFields from "./CommandDetailFields.vue";
import ParametersPanel from "./ParametersPanel.vue";
import { IDeviceCommand } from "sitewhere-rest-api";

@Component({
  components: {
    CommandDetailFields,
    ParametersPanel
  }
})
export default class CommandDialog extends DialogComponent<IDeviceCommand> {
  @Prop() readonly deviceTypeToken!: string;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DialogSection;
    parameters: DialogSection;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Customer;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {
      deviceTypeToken: this.deviceTypeToken
    };
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.parameters.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.parameters) {
      this.$refs.parameters.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    this.$refs.dialog.setActiveTab("details");
  }

  // Load dialog from a given payload.
  load(payload: IDeviceCommand) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.parameters) {
      this.$refs.parameters.load(payload);
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab("details");
      return;
    }

    if (!this.$refs.parameters.validate()) {
      this.$refs.dialog.setActiveTab("parameters");
      return;
    }

    var payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>

<style scoped>
</style>
