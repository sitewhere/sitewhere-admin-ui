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
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent, DialogSection } from "sitewhere-ide-components";

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
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: AreaDetailFields;
  @Ref() readonly bounds!: AreaBoundsPanel;
  @Ref() readonly branding!: BrandingPanel;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Area;
  }

  /** Generate payload from UI */
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.details.save(),
      this.bounds.save(),
      this.branding.save(),
      this.metadata.save()
    );
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.bounds) {
      this.bounds.reset();
    }
    if (this.branding) {
      this.branding.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: IArea) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.bounds) {
      this.bounds.load(payload);
    }
    if (this.branding) {
      this.branding.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  /** Called when tab selection is updated */
  onTabSelected(updated: number) {
    if (1 === updated) {
      this.bounds.makeMapVisible();
    }
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.bounds.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    if (!this.branding.validate()) {
      this.dialog.setActiveTab(2);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
