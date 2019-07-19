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
    <dialog-header>Assign a customer, area, and/or asset associated with '{{ device.token }}'.</dialog-header>
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
import {
  Component,
  Prop,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import DialogHeader from "../common/dialog/DialogHeader.vue";
import AssignmentCustomerFields from "./AssignmentCustomerFields.vue";
import AssignmentAreaFields from "./AssignmentAreaFields.vue";
import AssignmentAssetFields from "./AssignmentAssetFields.vue";

import { IDeviceAssignment, IDevice } from "sitewhere-rest-api";

@Component({
  components: {
    DialogHeader,
    AssignmentCustomerFields,
    AssignmentAreaFields,
    AssignmentAssetFields
  }
})
export default class AssignmentDialog extends DialogComponent<
  IDeviceAssignment
> {
  @Prop() readonly device!: IDevice;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    customer: DialogSection;
    area: DialogSection;
    asset: DialogSection;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceAssignment;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.customer.save(),
      this.$refs.area.save(),
      this.$refs.asset.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.customer) {
      this.$refs.customer.reset();
    }
    if (this.$refs.area) {
      this.$refs.area.reset();
    }
    if (this.$refs.asset) {
      this.$refs.asset.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    if (this.$refs.dialog) {
      this.$refs.dialog.setActiveTab(0);
    }
  }

  // Load dialog from a given payload.
  load(payload: IDeviceAssignment) {
    this.reset();
    if (this.$refs.customer) {
      this.$refs.customer.load(payload);
    }
    if (this.$refs.area) {
      this.$refs.area.load(payload);
    }
    if (this.$refs.asset) {
      this.$refs.asset.load(payload);
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.customer.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }
    if (!this.$refs.area.validate()) {
      this.$refs.dialog.setActiveTab(1);
      return;
    }
    if (!this.$refs.asset.validate()) {
      this.$refs.dialog.setActiveTab(2);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
