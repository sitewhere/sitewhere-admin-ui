<template>
  <navigation-page icon="cog" title="Customer Types"
    loadingMessage="Loading customer types ..." :loaded="loaded">
    <div v-if="customerTypes" slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;">
        <v-layout row wrap>
           <v-flex xs6 v-for="(customerType) in customerTypes"
            :key="customerType.token">
            <customer-type-list-entry :customerType="customerType"
              :customerTypes="customerTypes"
              @customerTypeOpened="onOpenCustomerType"
              @customerTypeDeleted="refresh">
            </customer-type-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <customer-type-create-dialog ref="add" 
        @customerTypeAdded="onCustomerTypeAdded"
        :customerTypes="customerTypes"/>
    </div>      
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Customer Type"
        @action="onAddCustomerType">
      </navigation-action-button>
    </div>

  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import Pager from "../common/Pager";
import CustomerTypeListEntry from "./CustomerTypeListEntry";
import CustomerTypeCreateDialog from "./CustomerTypeCreateDialog";
import { _listCustomerTypes } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    results: null,
    paging: null,
    customerTypes: [],
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    CustomerTypeListEntry,
    CustomerTypeCreateDialog
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },

    // Refresh list of area types.
    refresh: function() {
      this.$data.loaded = false;
      var paging = this.$data.paging.query;
      var component = this;
      _listCustomerTypes(this.$store, false, paging)
        .then(function(response) {
          component.results = response.data;
          component.$data.customerTypes = response.data.results;
          component.loaded = true;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },

    // Called when a customer type is clicked.
    onOpenCustomerType: function(token) {
      var tenant = this.$store.getters.selectedTenant;
      if (tenant) {
        this.$router.push("/tenants/" + tenant.id + "/customertypes/" + token);
      }
    },

    // Called to open dialog.
    onAddCustomerType: function() {
      this.$refs.add.onOpenDialog();
    },

    // Called when a new area type is added.
    onCustomerTypeAdded: function() {
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
