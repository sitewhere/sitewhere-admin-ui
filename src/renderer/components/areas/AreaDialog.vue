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
    @tabSelected="onTabSelected"
  >
    <template slot="tabs">
      <v-tab key="details">Details</v-tab>
      <v-tab key="bounds">Bounds</v-tab>
      <v-tab key="branding">Branding</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <area-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="bounds">
        <area-bounds-panel ref="bounds" />
      </v-tab-item>
      <v-tab-item key="branding">
        <branding-panel ref="branding" />
      </v-tab-item>
      <v-tab-item key="metadata">
        <sw-metadata-panel ref="metadata" />
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

import AreaDetailFields from "./AreaDetailFields.vue";
import AreaBoundsPanel from "./AreaBoundsPanel.vue";
import BrandingPanel from "../common/BrandingPanel.vue";
import { IArea } from "sitewhere-rest-api";

@Component({
  components: {
    AreaDetailFields,
    AreaBoundsPanel,
    BrandingPanel
  }
})
export default class AreaDialog extends DialogComponent<IArea> {
  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: AreaDetailFields;
    bounds: AreaBoundsPanel;
    branding: BrandingPanel;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Area;
  }

  /** Generate payload from UI */
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.bounds.save(),
      this.$refs.branding.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.bounds) {
      this.$refs.bounds.reset();
    }
    if (this.$refs.branding) {
      this.$refs.branding.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: IArea) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.bounds) {
      this.$refs.bounds.load(payload);
    }
    if (this.$refs.branding) {
      this.$refs.branding.load(payload);
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.load(payload);
    }
  }

  /** Called when tab selection is updated */
  onTabSelected(updated: number) {
    if (1 === updated) {
      this.$refs.bounds.makeMapVisible();
    }
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    if (!this.$refs.bounds.validate()) {
      this.$refs.dialog.setActiveTab(1);
      return;
    }

    if (!this.$refs.branding.validate()) {
      this.$refs.dialog.setActiveTab(2);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
