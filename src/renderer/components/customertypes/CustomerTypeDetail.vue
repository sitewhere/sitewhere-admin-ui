<template>
  <div>
    <navigation-page v-if="customerType" icon="cog"
      :title="customerType.name" loadingMessage="Loading customer type ..."
      :loaded="loaded">
      <div v-if="customerType" slot="content">
        <customer-type-detail-header :customerType="customerType"
          :customerTypes="customerTypes"
          @customerTypeDeleted="onCustomerTypeDeleted"
          @customerTypeUpdated="onCustomerTypeUpdated">
        </customer-type-detail-header>
        <v-tabs v-model="active">
          <v-tabs-bar dark color="primary">
            <v-tabs-item key="instances" href="#instances">
              Instances
            </v-tabs-item>
            <v-tabs-slider></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content key="instances" id="instances">
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
              <pager :results="results" @pagingUpdated="updatePaging">
                <no-results-panel slot="noresults"
                  text="No Customers of This Type Found">
                </no-results-panel>
              </pager>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </div>
      <div slot="actions">
        <navigation-action-button icon="edit" tooltip="Edit Customer Type"
          @action="onEdit">
        </navigation-action-button>
        <navigation-action-button icon="times" tooltip="Delete Customer Type"
          @action="onDelete">
        </navigation-action-button>
      </div>
    </navigation-page>
    <customer-type-update-dialog ref="edit" :token="token"
      :customerTypes="customerTypes"
      @customerTypeUpdated="onCustomerTypeUpdated">
    </customer-type-update-dialog>
    <customer-type-delete-dialog ref="delete" :token="token"
      @customerTypeDeleted="onCustomerTypeDeleted">
    </customer-type-delete-dialog>
  </div>
</template>

<script>
import Utils from "../common/Utils";
import Pager from "../common/Pager";
import NoResultsPanel from "../common/NoResultsPanel";
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import CustomerTypeDetailHeader from "./CustomerTypeDetailHeader";
import CustomerTypeDeleteDialog from "./CustomerTypeDeleteDialog";
import CustomerTypeUpdateDialog from "./CustomerTypeUpdateDialog";
import CustomerListEntry from "../customers/CustomerListEntry";
import {
  _getCustomerType,
  _listCustomerTypes,
  _listCustomers
} from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    token: null,
    customerType: null,
    customerTypes: [],
    results: null,
    customers: [],
    paging: null,
    active: null,
    loaded: false
  }),

  components: {
    Pager,
    NoResultsPanel,
    NavigationPage,
    NavigationActionButton,
    CustomerTypeDetailHeader,
    CustomerListEntry,
    CustomerTypeDeleteDialog,
    CustomerTypeUpdateDialog
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
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refreshCustomers();
    },
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

      // Load customer type information.
      _getCustomerType(this.$store, token)
        .then(function(response) {
          component.loaded = true;
          component.onDataLoaded(response.data);
        })
        .catch(function(e) {
          component.loaded = true;
        });
      _listCustomerTypes(this.$store, false, "page=1&pageSize=0")
        .then(function(response) {
          component.$data.customerTypes = response.data.results;
        })
        .catch(function(e) {});

      this.refreshCustomers();
    },
    refreshCustomers: function() {
      var component = this;

      // Search options.
      let options = {};
      options.rootOnly = false;
      options.customerTypeToken = this.$data.token;
      options.includeCustomerType = false;
      options.includeAssignments = false;

      _listCustomers(this.$store, options, this.$data.paging)
        .then(function(response) {
          component.results = response.data;
          component.customers = response.data.results;
        })
        .catch(function(e) {});
    },
    // Called after data is loaded.
    onDataLoaded: function(customerType) {
      this.$data.customerType = customerType;
      var section = {
        id: "customertypes",
        title: "Customer Types",
        icon: "cog",
        route: "/admin/customertypes/" + customerType.token,
        longTitle: "Manage Customer Type: " + customerType.name
      };
      this.$store.commit("currentSection", section);
    },
    // Called to open customer type edit dialog.
    onEdit: function() {
      this.$refs["edit"].onOpenDialog();
    },
    // Called when customer type is updated.
    onCustomerTypeUpdated: function() {
      this.refresh();
    },
    onDelete: function() {
      this.$refs["delete"].showDeleteDialog();
    },
    // Called when customer type is deleted.
    onCustomerTypeDeleted: function() {
      Utils.routeTo(this, "/customertypes");
    },
    // Called to open a customer.
    onOpenCustomer: function(customer) {
      Utils.routeTo(this, "/customers/" + customer.token);
    }
  }
};
</script>

<style scoped>
</style>
