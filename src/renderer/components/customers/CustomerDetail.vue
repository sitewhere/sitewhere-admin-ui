<template>
  <div>
    <navigation-page v-if="customer" icon="building" :title="customer.name"
      loadingMessage="Loading customer ..." :loaded="loaded">
      <div v-if="customer.parentCustomer" slot="actions">
        <v-tooltip left>
          <v-btn icon slot="activator" @click="onUpOneLevel">
            <font-awesome-icon icon="arrow-circle-up" size="lg"/>
          </v-btn>
          <span>Up One Level</span>
        </v-tooltip>
      </div>
      <div v-if="customer" slot="content">
        <customer-detail-header :customer="customer">
        </customer-detail-header>
        <v-tabs v-model="active">
          <v-tabs-bar dark color="primary">
            <v-tabs-item key="customers" href="#customers">
              Subcustomers
            </v-tabs-item>
            <v-tabs-item key="assignments" href="#assignments">
              Assigned Devices
            </v-tabs-item>
            <v-tabs-item key="locations" href="#locations">
              Locations
            </v-tabs-item>
            <v-tabs-item key="measurements" href="#measurements">
              Measurements
            </v-tabs-item>
            <v-tabs-item key="alerts" href="#alerts">
              Alerts
            </v-tabs-item>
            <v-tabs-slider></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content key="customers" id="customers">
              <customer-contained-customers ref="customers" :customer="customer">
              </customer-contained-customers>
            </v-tabs-content>
            <v-tabs-content key="assignments" id="assignments">
              <customer-assignments :customer="customer">
              </customer-assignments>
            </v-tabs-content>
            <v-tabs-content key="locations" id="locations">
              <customer-location-events :customer="customer">
              </customer-location-events>
            </v-tabs-content>
            <v-tabs-content key="measurements" id="measurements">
              <customer-measurement-events :customer="customer">
              </customer-measurement-events>
            </v-tabs-content>
            <v-tabs-content key="alerts" id="alerts">
              <customer-alert-events :customer="customer">
              </customer-alert-events>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <customer-create-dialog ref="customerCreate" :parentCustomer="customer" 
          @customerAdded="onSubcustomerAdded"/>
      </div>
      <div slot="actions">
        <navigation-action-button icon="building" tooltip="Add Subcustomer"
          @action="onAddSubcustomer">
        </navigation-action-button>
        <navigation-action-button icon="edit" tooltip="Edit Customer"
          @action="onEdit">
        </navigation-action-button>
        <navigation-action-button icon="times" tooltip="Delete Customer"
          @action="onDelete">
        </navigation-action-button>
      </div>
    </navigation-page>
    <customer-update-dialog ref="edit" :token="token"
      :parentCustomer="parentCustomer" @customerUpdated="onCustomerUpdated">
    </customer-update-dialog>
    <customer-delete-dialog ref="delete" :token="token"
      @customerDeleted="onCustomerDeleted">
    </customer-delete-dialog>
  </div>
</template>

<script>
import Utils from "../common/Utils";
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import CustomerDetailHeader from "./CustomerDetailHeader";
import CustomerContainedCustomers from "./CustomerContainedCustomers";
import CustomerAssignments from "./CustomerAssignments";
import CustomerLocationEvents from "./CustomerLocationEvents";
import CustomerMeasurementEvents from "./CustomerMeasurementEvents";
import CustomerAlertEvents from "./CustomerAlertEvents";
import CustomerCreateDialog from "./CustomerCreateDialog";
import CustomerUpdateDialog from "./CustomerUpdateDialog";
import CustomerDeleteDialog from "./CustomerDeleteDialog";

import { _getCustomer } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    token: null,
    parentCustomer: null,
    customer: null,
    active: null,
    loaded: false
  }),

  components: {
    Utils,
    NavigationPage,
    NavigationActionButton,
    CustomerDetailHeader,
    CustomerContainedCustomers,
    CustomerAssignments,
    CustomerLocationEvents,
    CustomerMeasurementEvents,
    CustomerAlertEvents,
    CustomerCreateDialog,
    CustomerDeleteDialog,
    CustomerUpdateDialog
  },

  // Called on initial create.
  created: function() {
    this.display(this.$route.params.token);
  },

  // Called when component is reused.
  beforeRouteUpdate(to, from, next) {
    this.display(to.params.token);
    next();
  },

  methods: {
    // Display area with the given token.
    display: function(token) {
      this.$data.token = token;
      this.refresh();
    },
    // Called to refresh area data.
    refresh: function() {
      this.$data.loaded = false;
      var token = this.$data.token;
      var component = this;

      // Load area information.
      _getCustomer(this.$store, token)
        .then(function(response) {
          component.loaded = true;
          component.onLoaded(response.data);
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },
    // Called after data is loaded.
    onLoaded: function(data) {
      this.$data.parentCustomer = data.parentCustomer;
      this.$data.customer = data;
      var section = {
        id: "customers",
        title: "Customers",
        icon: "building",
        route: "/admin/customers/" + data.token,
        longTitle: "Manage Customer: " + data.name
      };
      this.$store.commit("currentSection", section);
    },
    // Called to open area edit dialog.
    onEdit: function() {
      this.$refs["edit"].onOpenDialog();
    },
    // Called to add a subcustomer.
    onAddSubcustomer: function() {
      this.$refs["customerCreate"].onOpenDialog();
    },
    // Called after subarea added.
    onSubcustomerAdded: function() {
      this.$data.active = "customers";
      this.$refs["customers"].refresh();
    },
    // Called when customer is updated.
    onCustomerUpdated: function() {
      this.refresh();
    },
    onDelete: function() {
      this.$refs["delete"].showDeleteDialog();
    },
    // Called when customer is deleted.
    onCustomerDeleted: function() {
      Utils.routeTo(this, "/customers");
    },
    // Move up one level in the area hierarchy.
    onUpOneLevel: function() {
      Utils.routeTo(this, "/customers/" + this.customer.parentCustomer.token);
    }
  }
};
</script>

<style scoped>
</style>
