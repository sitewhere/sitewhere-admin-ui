<template>
  <navigation-page
    icon="globe"
    title="Manage Global Microservice"
    loadingMessage="Loading microservice configuration ..."
    :loaded="loaded"
  >
    <div slot="content">
      <unsaved-updates-warning
        class="mb-3"
        :unsaved="dirty"
        @save="onSaveConfiguration"
        @revert="onRevertConfiguration"
      ></unsaved-updates-warning>
      <microservice-editor
        :config="config"
        :configModel="configModel"
        :identifier="identifier"
        @dirty="onConfigurationUpdated"
      ></microservice-editor>
    </div>
    <div slot="actions">
      <navigation-action-button
        icon="arrow-left"
        tooltip="Back To Global Microservices"
        @action="onBackToList"
      ></navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import MicroserviceEditor from "../microservice/MicroserviceEditor";
import UnsavedUpdatesWarning from "../microservice/UnsavedUpdatesWarning";

import {
  getConfigurationModel,
  getGlobalConfiguration,
  updateGlobalConfiguration
} from "../../rest/sitewhere-instance-api";

export default {
  data: () => ({
    identifier: null,
    config: null,
    configModel: null,
    dirty: false,
    loaded: false
  }),

  components: {
    NavigationPage,
    NavigationActionButton,
    MicroserviceEditor,
    UnsavedUpdatesWarning
  },

  created: function() {
    this.$data.identifier = this.$route.params.identifier;
    this.refresh();
  },

  methods: {
    // Called to refresh data.
    refresh: function() {
      this.$data.loaded = false;

      // Load configuration data.
      var component = this;
      getConfigurationModel(this.$store, this.$data.identifier)
        .then(function(response) {
          component.loaded = true;
          component.$data.configModel = response.data;
          var microservice = response.data.microserviceDetails;
          var section = {
            id: "global",
            title: "Manage Microservice",
            icon: microservice.icon,
            route: "/system/microservices/" + microservice.identifier,
            longTitle: "Manage Global Microservice: " + microservice.name
          };
          component.$store.commit("currentSection", section);
        })
        .catch(function(e) {
          component.loaded = true;
        });
      getGlobalConfiguration(this.$store, this.$data.identifier)
        .then(function(response) {
          component.$data.config = response.data;
        })
        .catch(function(e) {});
    },

    // Called when configuration is changed.
    onConfigurationUpdated: function() {
      this.$data.dirty = true;
    },

    // Called when configuration is to be saved.
    onSaveConfiguration: function() {
      var component = this;
      updateGlobalConfiguration(
        this.$store,
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
      this.$router.push("/system/microservices");
    }
  }
};
</script>

<style>
</style>
