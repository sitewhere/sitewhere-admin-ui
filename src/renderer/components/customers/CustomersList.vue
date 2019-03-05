<template>
  <navigation-page
    icon="building"
    title="Customers"
    loadingMessage="Loading customers ..."
    :loaded="loaded"
  >
    <div slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="customers">
        <v-layout row wrap>
          <v-flex xs6 v-for="(customer) in customers" :key="customer.token">
            <customer-list-entry :customer="customer" @openCustomer="onOpenCustomer"></customer-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <customer-create-dialog ref="add" @customerAdded="onCustomerAdded"/>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Customer" @action="onAddCustomer"></navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import Pager from "../common/Pager";
import CustomerListEntry from "./CustomerListEntry";
import CustomerCreateDialog from "./CustomerCreateDialog";

import { routeTo } from "../common/Utils";
import { listCustomers } from "../../rest/sitewhere-customers-api";

export default {
  data: () => ({
    results: null,
    paging: null,
    customers: null,
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    CustomerListEntry,
    CustomerCreateDialog
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },
    // Refresh list of areas.
    refresh: function() {
      this.$data.loaded = false;
      var paging = this.$data.paging.query;
      var component = this;

      // Search options.
      let options = {};
      options.includeCustomerType = true;
      options.includeAssignments = false;

      listCustomers(this.$store, options, paging)
        .then(function(response) {
          component.results = response.data;
          component.customers = response.data.results;
          component.loaded = true;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },
    // Called to open a customer.
    onOpenCustomer: function(customer) {
      routeTo(this, "/customers/" + customer.token);
    },

    // Called to open dialog.
    onAddCustomer: function() {
      this.$refs.add.onOpenDialog();
    },

    // Called when a new customer is added.
    onCustomerAdded: function() {
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
