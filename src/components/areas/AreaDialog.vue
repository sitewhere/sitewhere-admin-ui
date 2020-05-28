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
        <metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  BaseDialog,
  DialogComponent,
  DialogSection,
  BrandingPanel,
  MetadataPanel
} from "sitewhere-ide-components";

import AreaDetailFields from "./AreaDetailFields.vue";
import AreaBoundsPanel from "./AreaBoundsPanel.vue";
import { IArea } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    AreaDetailFields,
    AreaBoundsPanel,
    BrandingPanel,
    MetadataPanel
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
    const payload: any = {};
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

  /** Called after create button is clicked */
  onCreateClicked() {
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

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>