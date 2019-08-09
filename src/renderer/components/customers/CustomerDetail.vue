<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading customer ..."
    :loaded="loaded"
    :record="customer"
  >
    <template slot="header">
      <customer-detail-header :record="customer" />
    </template>
    <template slot="tabs">
      <v-tab key="customers">Subcustomers</v-tab>
      <v-tab key="assignments">Assigned Devices</v-tab>
      <v-tab key="locations">Locations</v-tab>
      <v-tab key="measurements">Measurements</v-tab>
      <v-tab key="alerts">Alerts</v-tab>
    </template>
    <template slot="tab-items">
      <customer-subcustomers tabkey="customers" ref="subcustomers" :customer="customer" />
      <customer-assignments tabkey="assignments" :customerToken="token" />
      <customer-location-events tabkey="locations" :customerToken="token" />
      <customer-measurement-events tabkey="measurements" :customerToken="token" />
      <customer-alert-events tabkey="alerts" :customerToken="token" />
    </template>
    <template slot="dialogs">
      <customer-create-dialog
        ref="create"
        :parentCustomer="customer"
        @created="onSubcustomerAdded"
      />
      <customer-update-dialog
        ref="edit"
        :token="token"
        :parentCustomer="parentCustomer"
        @updated="onCustomerUpdated"
      />
      <customer-delete-dialog ref="delete" :token="token" @deleted="onCustomerDeleted" />
    </template>
    <template slot="actions">
      <up-button v-if="parentCustomer" tooltip="Up One Level" @action="onUpOneLevel" />
      <customer-button tooltip="Add Subcustomer" @action="onAddSubcustomer" />
      <edit-button tooltip="Edit Customer" @action="onEdit" />
      <delete-button tooltip="Delete Customer" @action="onDelete" />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import { Component, DetailComponent } from "sitewhere-ide-common";

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
import UpButton from "../common/navbuttons/UpButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { Route } from "vue-router";
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
    UpButton,
    EditButton,
    DeleteButton
  }
})
export default class CustomerDetail extends DetailComponent<ICustomer> {
  parentCustomer: ICustomer | null = null;

  // References.
  $refs!: Refs<{
    create: CustomerCreateDialog;
    edit: CustomerUpdateDialog;
    delete: CustomerDeleteDialog;
    subcustomers: CustomerSubcustomers;
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

  /** Called when component is reused */
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    this.display(to.params.token);
    next();
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
    this.$refs.create.open();
  }

  // Called after subarea added.
  onSubcustomerAdded() {
    this.$refs.subcustomers.refresh();
  }

  // Called when customer is updated.
  onCustomerUpdated() {
    this.refresh();
  }

  onDelete() {
    if (this.token) {
      this.$refs.delete.open(this.token);
    }
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
