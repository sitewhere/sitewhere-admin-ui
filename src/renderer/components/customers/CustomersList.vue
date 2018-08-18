<template>
  <navigation-page icon="building" title="Customers"
    loadingMessage="Loading customers ..." :loaded="loaded">
    <div slot="content">
      <v-container fluid grid-list-md v-if="customers">
        <v-layout row wrap>
           <v-flex xs6 v-for="(customer) in customers"
            :key="customer.token">
            <customer-list-entry :customer="customer"
              @openCustomer="onOpenCustomer">
            </customer-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <customer-create-dialog @customerAdded="onCustomerAdded"/>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import Utils from "../common/Utils";
import Pager from "../common/Pager";
import CustomerListEntry from "./CustomerListEntry";
import CustomerCreateDialog from "./CustomerCreateDialog";
import { _listCustomers } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    results: null,
    paging: null,
    customers: null,
    loaded: false
  }),

  components: {
    NavigationPage,
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

      _listCustomers(this.$store, options, paging)
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
      Utils.routeTo(this, "/customers/" + customer.token);
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
