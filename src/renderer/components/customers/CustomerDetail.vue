<template>
  <detail-page
    icon="building"
    :title="title"
    loadingMessage="Loading customer ..."
    :loaded="loaded"
    :record="customer"
  >
    <template slot="header">
      <customer-detail-header :record="customer"/>
    </template>
    <v-tabs v-model="active">
      <v-tabs-bar dark color="primary">
        <v-tabs-item key="customers" href="#customers">Subcustomers</v-tabs-item>
        <v-tabs-item key="assignments" href="#assignments">Assigned Devices</v-tabs-item>
        <v-tabs-item key="locations" href="#locations">Locations</v-tabs-item>
        <v-tabs-item key="measurements" href="#measurements">Measurements</v-tabs-item>
        <v-tabs-item key="alerts" href="#alerts">Alerts</v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <customer-subcustomers
          key="customers"
          id="customers"
          ref="customers"
          :customerToken="token"
        />
        <customer-assignments key="assignments" id="assignments" :customerToken="token"/>
        <customer-location-events key="locations" id="locations" :customerToken="token"/>
        <customer-measurement-events key="measurements" id="measurements" :customerToken="token"/>
        <customer-alert-events key="alerts" id="alerts" :customerToken="token"/>
      </v-tabs-items>
    </v-tabs>
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
import { DetailComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

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
import { INavigationSection } from "../../libraries/navigation-model";
import { getCustomer } from "../../rest/sitewhere-customers-api";
import {
  ICustomer,
  ICustomerResponseFormat
} from "sitewhere-rest-api/dist/model/customers-model";

export class CustomerDetailComponent extends DetailComponent<ICustomer> {}

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
export default class CustomerDetail extends Mixins(CustomerDetailComponent) {
  active: string | null = null;
  parentCustomer: ICustomer | null = null;

  get customer(): ICustomer | null {
    return this.record;
  }

  get title(): string {
    return this.customer ? this.customer.name : "";
  }

  get token(): string | null {
    return this.customer ? this.customer.token : null;
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
    (this.$refs["edit"] as any).onOpenDialog();
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
