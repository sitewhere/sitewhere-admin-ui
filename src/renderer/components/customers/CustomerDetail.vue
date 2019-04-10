<template>
  <detail-page
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
      <v-tab key="customers" href="#customers">Subcustomers</v-tab>
      <v-tab key="assignments" href="#assignments">Assigned Devices</v-tab>
      <v-tab key="locations" href="#locations">Locations</v-tab>
      <v-tab key="measurements" href="#measurements">Measurements</v-tab>
      <v-tab key="alerts" href="#alerts">Alerts</v-tab>
    </template>
    <template slot="tab-items">
      <customer-subcustomers
        tabkey="customers"
        id="customers"
        ref="customers"
        :customer="customer"
      />
      <customer-assignments tabkey="assignments" id="assignments" :customerToken="token"/>
      <customer-location-events tabkey="locations" id="locations" :customerToken="token"/>
      <customer-measurement-events tabkey="measurements" id="measurements" :customerToken="token"/>
      <customer-alert-events tabkey="alerts" id="alerts" :customerToken="token"/>
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
      <navigation-action-button
        icon="building"
        tooltip="Add Subcustomer"
        @action="onAddSubcustomer"
      ></navigation-action-button>
      <navigation-action-button icon="edit" tooltip="Edit Customer" @action="onEdit"></navigation-action-button>
      <navigation-action-button icon="times" tooltip="Delete Customer" @action="onDelete"></navigation-action-button>
    </template>
  </detail-page>
</template>

<script lang="ts">
import {
  DetailComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import DetailPage from "../common/DetailPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import CustomerDetailHeader from "./CustomerDetailHeader.vue";
import CustomerSubcustomers from "./CustomerSubcustomers.vue";
import CustomerAssignments from "./CustomerAssignments.vue";
import CustomerLocationEvents from "./CustomerLocationEvents.vue";
import CustomerMeasurementEvents from "./CustomerMeasurementEvents.vue";
import CustomerAlertEvents from "./CustomerAlertEvents.vue";
import CustomerCreateDialog from "./CustomerCreateDialog.vue";
import CustomerUpdateDialog from "./CustomerUpdateDialog.vue";
import CustomerDeleteDialog from "./CustomerDeleteDialog.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection, Refs } from "../../libraries/navigation-model";
import { getCustomer } from "../../rest/sitewhere-customers-api";
import { ICustomer, ICustomerResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    CustomerDetailHeader,
    CustomerSubcustomers,
    CustomerAssignments,
    CustomerLocationEvents,
    CustomerMeasurementEvents,
    CustomerAlertEvents,
    CustomerCreateDialog,
    CustomerDeleteDialog,
    CustomerUpdateDialog
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
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<ICustomer> {
    let format: ICustomerResponseFormat = {
      includeCustomerType: true,
      includeParentCustomer: true
    };
    return getCustomer(store, token, format);
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
