<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Filter Device Assignment List"
    width="700"
    :loaded="loaded"
    :visible="dialogVisible"
    createLabel="Filter"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <dialog-header>Choose criteria for filtering which device assignments are shown.</dialog-header>
    <template slot="tabs">
      <v-tab key="devicetype">Device Types</v-tab>
      <v-tab key="customer">Customers</v-tab>
      <v-tab key="area">Areas</v-tab>
      <v-tab key="asset">Assets</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="devicetype">
        <assignment-list-filter-device-type-fields ref="devicetype" />
      </v-tab-item>
      <v-tab-item key="customer">
        <assignment-list-filter-customer-fields ref="customer" />
      </v-tab-item>
      <v-tab-item key="area">
        <assignment-list-filter-area-fields ref="area" />
      </v-tab-item>
      <v-tab-item key="asset">
        <assignment-list-filter-asset-fields ref="asset" />
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

import DialogHeader from "../common/dialog/DialogHeader.vue";
import AssignmentListFilterDeviceTypeFields from "./AssignmentListFilterDeviceTypeFields.vue";
import AssignmentListFilterCustomerFields from "./AssignmentListFilterCustomerFields.vue";
import AssignmentListFilterAreaFields from "./AssignmentListFilterAreaFields.vue";
import AssignmentListFilterAssetFields from "./AssignmentListFilterAssetFields.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DialogHeader,
    AssignmentListFilterDeviceTypeFields,
    AssignmentListFilterCustomerFields,
    AssignmentListFilterAreaFields,
    AssignmentListFilterAssetFields
  }
})
export default class AssignmentListFilterDialog extends DialogComponent<
  IDeviceAssignmentSearchCriteria
> {
  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    devicetype: DialogSection;
    customer: DialogSection;
    area: DialogSection;
    asset: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceAssignment;
  }

  /** Generate payload from UI */
  generatePayload(): IDeviceAssignmentSearchCriteria {
    let payload: IDeviceAssignmentSearchCriteria = {};
    Object.assign(payload, this.$refs.devicetype.save());
    Object.assign(payload, this.$refs.customer.save());
    Object.assign(payload, this.$refs.area.save());
    Object.assign(payload, this.$refs.asset.save());
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.$refs.devicetype) {
      this.$refs.devicetype.reset();
    }
    if (this.$refs.customer) {
      this.$refs.customer.reset();
    }
    if (this.$refs.area) {
      this.$refs.area.reset();
    }
    if (this.$refs.asset) {
      this.$refs.asset.reset();
    }
    if (this.$refs.dialog) {
      this.$refs.dialog.setActiveTab(0);
    }
  }

  /** Load dialog from a given payload */
  load(payload: IDeviceAssignmentSearchCriteria) {
    this.reset();
    if (this.$refs.devicetype) {
      this.$refs.devicetype.load(payload);
    }
    if (this.$refs.customer) {
      this.$refs.customer.load(payload);
    }
    if (this.$refs.area) {
      this.$refs.area.load(payload);
    }
    if (this.$refs.asset) {
      this.$refs.asset.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    if (!this.$refs.devicetype.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }
    if (!this.$refs.customer.validate()) {
      this.$refs.dialog.setActiveTab(1);
      return;
    }
    if (!this.$refs.area.validate()) {
      this.$refs.dialog.setActiveTab(2);
      return;
    }
    if (!this.$refs.asset.validate()) {
      this.$refs.dialog.setActiveTab(3);
      return;
    }

    var payload: IDeviceAssignmentSearchCriteria = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
