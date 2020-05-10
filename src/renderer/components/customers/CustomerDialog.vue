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
      <v-tab key="details">Details</v-tab>
      <v-tab key="branding">Branding</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <customer-detail-fields ref="details" />
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

import CustomerDetailFields from "./CustomerDetailFields.vue";
import BrandingPanel from "../common/BrandingPanel.vue";
import { ICustomer } from "sitewhere-rest-api";

@Component({
  components: {
    CustomerDetailFields,
    BrandingPanel
  }
})
export default class CustomerDialog extends DialogComponent<ICustomer> {
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: CustomerDetailFields;
  @Ref() readonly branding!: BrandingPanel;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Customer;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.details.save(),
      this.branding.save(),
      this.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.branding) {
      this.branding.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: ICustomer) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.branding) {
      this.branding.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.branding.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    var payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>
