<template>
  <navigation-page v-if="tenant" icon="microchip"
    title="Manage Tenant Microservice"
    loadingMessage="Loading tenant engine configuration ..." :loaded="loaded">
    <div slot="content">
      <tenant-runtimes-block :identifier="identifier"
        :tenantToken="tenantToken">
      </tenant-runtimes-block>
      <unsaved-updates-warning class="mb-3" :unsaved="dirty"
        @save="onSaveConfiguration" @revert="onRevertConfiguration">
      </unsaved-updates-warning>
      <microservice-editor :config="config" :configModel="configModel"
        :identifier="identifier" :tenantToken="tenantToken"
        @dirty="onConfigurationUpdated">
      </microservice-editor>
    </div>
    <div slot="actions">
      <navigation-action-button icon="arrow-left"
        tooltip="Back To Tenant Microservices"
        @action="onBackToList">
      </navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import TenantRuntimesBlock from "./TenantRuntimesBlock";
import MicroserviceEditor from "../microservice/MicroserviceEditor";
import UnsavedUpdatesWarning from "../microservice/UnsavedUpdatesWarning";
import {
  _getTenant,
  _getConfigurationModel,
  _getTenantConfiguration,
  _updateTenantConfiguration
} from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    tenantToken: null,
    identifier: null,
    tenant: null,
    config: null,
    configModel: null,
    dirty: false,
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    TenantRuntimesBlock,
    MicroserviceEditor,
    UnsavedUpdatesWarning
  },

  created: function() {
    this.$data.tenantToken = this.$route.params.tenantToken;
    this.$data.identifier = this.$route.params.identifier;
    this.refresh();
  },

  methods: {
    // Called to refresh data.
    refresh: function() {
      this.$data.loaded = false;

      // Load tenant data.
      this.refreshTenant();

      // Load configuration data.
      var component = this;
      _getConfigurationModel(this.$store, this.$data.identifier)
        .then(function(response) {
          component.$data.configModel = response.data;
          var microservice = response.data.microserviceDetails;
          var section = {
            id: "tenants",
            title: "Manage Microservice",
            icon: "layers",
            route:
              "/tenants/" +
              component.$data.tenantToken +
              "/" +
              microservice.identifier,
            longTitle: "Manage Tenant Microservice: " + microservice.name
          };
          component.loaded = true;
          component.$store.commit("currentSection", section);
        })
        .catch(function(e) {
          component.loaded = true;
        });
      _getTenantConfiguration(
        this.$store,
        this.$data.tenantToken,
        this.$data.identifier
      )
        .then(function(response) {
          component.$data.config = response.data;
        })
        .catch(function(e) {});
    },

    // Refresh only tenant information.
    refreshTenant: function() {
      var component = this;
      _getTenant(this.$store, this.$data.tenantToken, true)
        .then(function(response) {
          component.onLoaded(response.data);
        })
        .catch(function(e) {});
    },

    // Called after data is loaded.
    onLoaded: function(tenant) {
      this.$data.tenant = tenant;
      this.$store.commit("selectedTenant", tenant);
    },

    // Called when configuration is changed.
    onConfigurationUpdated: function() {
      this.$data.dirty = true;
    },

    // Called when configuration is to be saved.
    onSaveConfiguration: function() {
      var component = this;
      _updateTenantConfiguration(
        this.$store,
        this.$data.tenantToken,
        this.$data.identifier,
        this.$data.config
      )
        .then(function(response) {
          component.$data.dirty = false;
        })
        .catch(function(e) {});
    },

    // Called when configuration is to be reverted.
    onRevertConfiguration: function() {
      this.refresh();
      this.$data.dirty = false;
    },

    // Navigate back to microservices list.
    onBackToList: function() {
      this.$router.push("/system/tenants/" + this.$data.tenantToken);
    }
  }
};
</script>

<style>
</style>
