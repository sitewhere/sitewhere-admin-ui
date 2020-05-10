<template>
  <sw-base-dialog
    ref="dialog"
    v-if="device"
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
    <sw-dialog-header>Assign a customer, area, and/or asset associated with '{{ device.token }}'.</sw-dialog-header>
    <template slot="tabs">
      <v-tab key="customer">Customer</v-tab>
      <v-tab key="area">Area</v-tab>
      <v-tab key="asset">Asset</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="customer">
        <assignment-customer-fields ref="customer" />
      </v-tab-item>
      <v-tab-item key="area">
        <assignment-area-fields ref="area" />
      </v-tab-item>
      <v-tab-item key="asset">
        <assignment-asset-fields ref="asset" />
      </v-tab-item>
      <v-tab-item key="metadata">
        <sw-metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent, DialogSection } from "sitewhere-ide-components";

import AssignmentCustomerFields from "./AssignmentCustomerFields.vue";
import AssignmentAreaFields from "./AssignmentAreaFields.vue";
import AssignmentAssetFields from "./AssignmentAssetFields.vue";

import { IDeviceAssignment, IDevice } from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentCustomerFields,
    AssignmentAreaFields,
    AssignmentAssetFields
  }
})
export default class AssignmentDialog extends DialogComponent<
  IDeviceAssignment
> {
  @Prop() readonly device!: IDevice;
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly customer!: AssignmentCustomerFields;
  @Ref() readonly area!: AssignmentAreaFields;
  @Ref() readonly asset!: AssignmentAssetFields;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceAssignment;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.customer.save(),
      this.area.save(),
      this.asset.save(),
      this.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.customer) {
      this.customer.reset();
    }
    if (this.area) {
      this.area.reset();
    }
    if (this.asset) {
      this.asset.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    if (this.dialog) {
      this.dialog.setActiveTab(0);
    }
  }

  // Load dialog from a given payload.
  load(payload: IDeviceAssignment) {
    this.reset();
    if (this.customer) {
      this.customer.load(payload);
    }
    if (this.area) {
      this.area.load(payload);
    }
    if (this.asset) {
      this.asset.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.customer.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }
    if (!this.area.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }
    if (!this.asset.validate()) {
      this.dialog.setActiveTab(2);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
