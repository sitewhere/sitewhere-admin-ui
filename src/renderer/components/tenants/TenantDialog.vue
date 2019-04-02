<template>
  <base-dialog
    ref="dialog"
    :title="title"
    :width="width"
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
        <tenant-detail-fields ref="details"/>
      </v-tab-item>
      <v-tab-item key="branding" id="branding">
        <branding-panel ref="branding"/>
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
import { Component } from "vue-property-decorator";

import BaseDialog from "../common/BaseDialog.vue";
import TenantDetailFields from "./TenantDetailFields.vue";
import BrandingPanel from "../common/BrandingPanel.vue";
import MetadataPanel from "../common/MetadataPanel.vue";

@Component({
  components: {
    BaseDialog,
    TenantDetailFields,
    BrandingPanel,
    MetadataPanel
  }
})
export default class TenantDialog extends DialogComponent {
  metadata: any = null;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DialogSection;
    branding: DialogSection;
    metadata: DialogSection;
  }>;

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.branding.save(),
      this.$refs.metadata.save()
    );
    console.log("Payload", payload);
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
  load(payload: any) {
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
    this.$emit("payload", payload);
  }
}
</script>

<style scoped>
</style>
