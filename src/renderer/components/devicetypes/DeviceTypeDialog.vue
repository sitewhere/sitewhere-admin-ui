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
      <v-tab key="branding" href="#branding">Branding</v-tab>
      <v-tab key="metadata" href="#metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" id="details">
        <device-type-detail-fields ref="details"/>
      </v-tab-item>
      <v-tab-item key="branding" id="branding">
        <branding-panel ref="branding"/>
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
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import DeviceTypeDetailFields from "./DeviceTypeDetailFields.vue";
import BrandingPanel from "../common/BrandingPanel.vue";
import { IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceTypeDetailFields,
    BrandingPanel
  }
})
export default class DeviceTypeDialog extends DialogComponent<IDeviceType> {
  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DialogSection;
    branding: DialogSection;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.branding.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.branding) {
      this.$refs.branding.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    this.$refs.dialog.setActiveTab("details");
  }

  // Load dialog from a given payload.
  load(payload: IDeviceType) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.branding) {
      this.$refs.branding.load(payload);
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

    if (!this.$refs.branding.validate()) {
      this.$refs.dialog.setActiveTab("branding");
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
