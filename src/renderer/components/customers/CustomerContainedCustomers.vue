<template>
  <div>
    <v-container fluid grid-list-md v-if="customers">
      <v-layout row wrap>
        <v-flex xs6 v-for="(customer) in customers" :key="customer.token">
          <customer-list-entry :customer="customer" @openCustomer="onOpenCustomer"></customer-list-entry>
        </v-flex>
      </v-layout>
    </v-container>
    <customer-create-dialog @customerAdded="refresh" :parentCustomer="customer"/>
    <pager :results="results" @pagingUpdated="updatePaging">
      <no-results-panel slot="noresults" text="No Contained Customers Found"></no-results-panel>
    </pager>
  </div>
</template>

<script>
import Pager from "../common/Pager";
import NoResultsPanel from "../common/NoResultsPanel";
import CustomerListEntry from "./CustomerListEntry";
import CustomerCreateDialog from "./CustomerCreateDialog";

import { routeTo } from "../common/Utils";
import { listCustomers } from "../../rest/sitewhere-customers-api";

export default {
  data: () => ({
    results: null,
    paging: null,
    customers: null
  }),

  props: ["customer"],

  components: {
    Pager,
    NoResultsPanel,
    CustomerListEntry,
    CustomerCreateDialog
  },

  watch: {
    // Refresh component if customer is updated.
    customer: function(value) {
      this.refresh();
    }
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },

    // Refresh list of assignments.
    refresh: function() {
      var component = this;
      var customerToken = this.customer.token;
      var paging = this.$data.paging.query;

      // Search options.
      let options = {};
      options.rootOnly = false;
      options.parentCustomerToken = customerToken;
      options.includeCustomerType = true;
      options.includeAssignments = false;

      listCustomers(this.$store, options, paging)
        .then(function(response) {
          component.results = response.data;
          component.customers = response.data.results;
        })
        .catch(function(e) {});
    },

    // Called when page number is updated.
    onPageUpdated: function(pageNumber) {
      this.$data.pager.page = pageNumber;
      this.refresh();
    },

    // Called to open a customer.
    onOpenCustomer: function(customer) {
      routeTo(this, "/customers/" + customer.token);
    }
  }
};
</script>

<style scoped>
</style>
