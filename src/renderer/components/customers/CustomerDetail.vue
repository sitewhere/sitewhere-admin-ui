<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading customer ..."
    :loaded="loaded"
    :record="customer"
  >
    <template slot="header">
      <customer-detail-header :record="customer"/>
    </template>
    <template slot="tabs">
      <v-tab key="customers">Subcustomers</v-tab>
      <v-tab key="assignments">Assigned Devices</v-tab>
      <v-tab key="locations">Locations</v-tab>
      <v-tab key="measurements">Measurements</v-tab>
      <v-tab key="alerts">Alerts</v-tab>
    </template>
    <template slot="tab-items">
      <customer-subcustomers tabkey="customers" ref="customers" :customer="customer"/>
      <customer-assignments tabkey="assignments" :customerToken="token"/>
      <customer-location-events tabkey="locations" :customerToken="token"/>
      <customer-measurement-events tabkey="measurements" :customerToken="token"/>
      <customer-alert-events tabkey="alerts" :customerToken="token"/>
    </template>
    <template slot="dialogs">
      <customer-create-dialog
        ref="create"
        :parentCustomer="customer"
        @customerAdded="onSubcustomerAdded"
      />
      <customer-update-dialog
        ref="edit"
        :token="token"
        :parentCustomer="parentCustomer"
        @customerUpdated="onCustomerUpdated"
      />
      <customer-delete-dialog ref="delete" :token="token" @customerDeleted="onCustomerDeleted"/>
    </template>
    <template slot="actions">
      <v-tooltip left v-if="parentCustomer">
        <v-btn icon slot="activator" @click="onUpOneLevel">
          <font-awesome-icon icon="arrow-circle-up" size="lg"/>
        </v-btn>
        <span>Up One Level</span>
      </v-tooltip>
      <customer-button tooltip="Add Subcustomer" @action="onAddSubcustomer"/>
      <edit-button tooltip="Edit Customer" @action="onEdit"/>
      <delete-button tooltip="Delete Customer" @action="onDelete"/>
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  DialogComponent
} from "sitewhere-ide-common";

import CustomerDetailHeader from "./CustomerDetailHeader.vue";
import CustomerSubcustomers from "./CustomerSubcustomers.vue";
import CustomerAssignments from "./CustomerAssignments.vue";
import CustomerLocationEvents from "./CustomerLocationEvents.vue";
import CustomerMeasurementEvents from "./CustomerMeasurementEvents.vue";
import CustomerAlertEvents from "./CustomerAlertEvents.vue";
import CustomerCreateDialog from "./CustomerCreateDialog.vue";
import CustomerUpdateDialog from "./CustomerUpdateDialog.vue";
import CustomerDeleteDialog from "./CustomerDeleteDialog.vue";
import CustomerButton from "../common/navbuttons/CustomerButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection, Refs } from "sitewhere-ide-common";
import { getCustomer } from "../../rest/sitewhere-customers-api";
import { ICustomer, ICustomerResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    CustomerDetailHeader,
    CustomerSubcustomers,
    CustomerAssignments,
    CustomerLocationEvents,
    CustomerMeasurementEvents,
    CustomerAlertEvents,
    CustomerCreateDialog,
    CustomerDeleteDialog,
    CustomerUpdateDialog,
    CustomerButton,
    EditButton,
    DeleteButton
  }
})
export default class CustomerDetail extends DetailComponent<ICustomer> {
  parentCustomer: ICustomer | null = null;

  // References.
  $refs!: Refs<{
    edit: CustomerUpdateDialog;
    delete: DialogComponent<ICustomer>;
  }>;

  /** Get record as customer */
  get customer(): ICustomer | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Customer;
  }

  /** Get page title */
  get title(): string {
    return this.customer ? this.customer.name : "";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<ICustomer> {
    let format: ICustomerResponseFormat = {
      includeCustomerType: true,
      includeParentCustomer: true
    };
    return getCustomer(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(customer: ICustomer) {
    this.parentCustomer = (customer as any).parentCustomer;
    var section: INavigationSection = {
      id: "customers",
      title: "Customers",
      icon: "building",
      route: "/admin/customers/" + customer.token,
      longTitle: "Manage Customer: " + customer.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called to open area edit dialog.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called to add a subcustomer.
  onAddSubcustomer() {
    (this.$refs["customerCreate"] as any).onOpenDialog();
  }

  // Called after subarea added.
  onSubcustomerAdded() {
    this.$data.active = "customers";
    (this.$refs["customers"] as any).refresh();
  }

  // Called when customer is updated.
  onCustomerUpdated() {
    this.refresh();
  }

  onDelete() {
    (this.$refs["delete"] as any).showDeleteDialog();
  }

  // Called when customer is deleted.
  onCustomerDeleted() {
    routeTo(this, "/customers");
  }

  // Move up one level in the area hierarchy.
  onUpOneLevel() {
    routeTo(this, "/customers/" + (this.customer as any).parentCustomer.token);
  }
}
</script>

<style scoped>
</style>
