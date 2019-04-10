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
      <v-tab key="details" href="#details">Details</v-tab>
      <v-tab key="metadata" href="#metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" id="details">
        <device-detail-fields ref="details"/>
      </v-tab-item>
      <v-tab-item key="metadata" id="metadata">
        <metadata-panel ref="metadata"/>
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import {
  DialogComponent,
  DialogSection
} from "../../libraries/component-model";
import { ITabbedComponent, Refs } from "../../libraries/navigation-model";
import { NavigationIcon } from "../../libraries/constants";
import { Component } from "vue-property-decorator";

import BaseDialog from "../common/BaseDialog.vue";
import DeviceDetailFields from "./DeviceDetailFields.vue";
import MetadataPanel from "../common/MetadataPanel.vue";
import { IDevice } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    DeviceDetailFields,
    MetadataPanel
  }
})
export default class DeviceDialog extends DialogComponent<IDevice> {
  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DialogSection;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
  }

  // Load dialog from a given payload.
  load(payload: IDevice) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
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

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>

<style scoped>
</style>
