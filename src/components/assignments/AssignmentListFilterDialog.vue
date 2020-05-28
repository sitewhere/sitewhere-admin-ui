<template>
  <base-dialog
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
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  DialogComponent,
  BaseDialog,
  DialogHeader
} from "sitewhere-ide-components";

import AssignmentListFilterDeviceTypeFields from "./AssignmentListFilterDeviceTypeFields.vue";
import AssignmentListFilterCustomerFields from "./AssignmentListFilterCustomerFields.vue";
import AssignmentListFilterAreaFields from "./AssignmentListFilterAreaFields.vue";
import AssignmentListFilterAssetFields from "./AssignmentListFilterAssetFields.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
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
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly devicetype!: AssignmentListFilterDeviceTypeFields;
  @Ref() readonly customer!: AssignmentListFilterCustomerFields;
  @Ref() readonly area!: AssignmentListFilterAreaFields;
  @Ref() readonly asset!: AssignmentListFilterAssetFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceAssignment;
  }

  /** Generate payload from UI */
  generatePayload(): IDeviceAssignmentSearchCriteria {
    const payload: IDeviceAssignmentSearchCriteria = {};
    Object.assign(payload, this.devicetype.save());
    Object.assign(payload, this.customer.save());
    Object.assign(payload, this.area.save());
    Object.assign(payload, this.asset.save());
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.devicetype) {
      this.devicetype.reset();
    }
    if (this.customer) {
      this.customer.reset();
    }
    if (this.area) {
      this.area.reset();
    }
    if (this.asset) {
      this.asset.reset();
    }
    if (this.dialog) {
      this.dialog.setActiveTab(0);
    }
  }

  /** Load dialog from a given payload */
  load(payload: IDeviceAssignmentSearchCriteria) {
    this.reset();
    if (this.devicetype) {
      this.devicetype.load(payload);
    }
    if (this.customer) {
      this.customer.load(payload);
    }
    if (this.area) {
      this.area.load(payload);
    }
    if (this.asset) {
      this.asset.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked() {
    if (!this.devicetype.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }
    if (!this.customer.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }
    if (!this.area.validate()) {
      this.dialog.setActiveTab(2);
      return;
    }
    if (!this.asset.validate()) {
      this.dialog.setActiveTab(3);
      return;
    }

    const payload: IDeviceAssignmentSearchCriteria = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
