<template>
  <navigation-page icon="layer-group" title="Manage Tenants"
    loadingMessage="Loading tenant list ..." :loaded="loaded">
    <div slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="tenants">
        <v-layout row wrap>
           <v-flex xs12 v-for="(tenant) in tenants" :key="tenant.token">
            <tenant-list-entry :tenant="tenant"
              @click="onOpenTenant(tenant)"
              @openTenant="onOpenTenant(tenant)"
              @configureTenant="onConfigureTenant(tenant)">
            </tenant-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <tenant-create-dialog ref="add" @tenantAdded="refresh">
      </tenant-create-dialog>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Tenant"
        @action="onAddTenant">
      </navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import Pager from "../common/Pager";
import TenantListEntry from "./TenantListEntry";
import TenantCreateDialog from "./TenantCreateDialog";
import { _listTenants } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    results: null,
    paging: null,
    tenants: null,
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    TenantListEntry,
    TenantCreateDialog
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },

    // Refresh list of tenants.
    refresh: function() {
      this.$data.loaded = false;
      var user = this.$store.getters.user;
      var paging = this.$data.paging.query;
      var component = this;
      _listTenants(this.$store, null, user.username, true, paging)
        .then(function(response) {
          component.results = response.data;
          component.tenants = response.data.results;
          component.loaded = true;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },

    // Called to open tenant management for tenant.
    onOpenTenant: function(tenant) {
      this.$store.commit("selectedTenant", tenant);
      this.$router.push("/tenants/" + tenant.token + "/areas");
    },

    // Called to open tenant detail.
    onConfigureTenant: function(tenant) {
      this.$router.push("/system/tenants/" + tenant.token);
    },
    // Called to open dialog.
    onAddTenant: function() {
      this.$refs.add.onOpenDialog();
    }
  }
};
</script>

<style scoped>
</style>
