<template>
  <navigation-page
    icon="microchip"
    title="Manage Tenant Microservice"
    loadingMessage="Loading tenant engine configuration ..."
    :loaded="loaded"
  >
    <div slot="content">
      <tenant-runtimes-block :identifier="identifier" :tenantToken="tenantToken"></tenant-runtimes-block>
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
        :tenantToken="tenantToken"
        @dirty="onConfigurationUpdated"
      ></microservice-editor>
    </div>
    <div slot="actions">
      <navigation-action-button
        icon="arrow-left"
        tooltip="Back To Tenant Microservices"
        @action="onBackToList"
      ></navigation-action-button>
    </div>
  </navigation-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import NavigationPage from "../common/NavigationPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import TenantRuntimesBlock from "./TenantRuntimesBlock.vue";
import MicroserviceEditor from "../microservice/MicroserviceEditor.vue";
import UnsavedUpdatesWarning from "../microservice/UnsavedUpdatesWarning.vue";

import { WithRoute } from "../common/WithRoute";
import { AxiosResponse } from "axios";
import {
  getConfigurationModel,
  getTenantConfiguration,
  updateTenantConfiguration
} from "../../rest/sitewhere-instance-api";
import {
  IConfigurationModel,
  IElementContent
} from "sitewhere-rest-api/dist/model/configuration-model";

@Component({
  components: {
    NavigationPage,
    NavigationActionButton,
    TenantRuntimesBlock,
    MicroserviceEditor,
    UnsavedUpdatesWarning
  }
})
export default class TenantMicroserviceEditor extends Vue implements WithRoute {
  tenantToken: string | null = null;
  identifier: string | null = null;
  config: IElementContent | null = null;
  configModel: IConfigurationModel | null = null;
  dirty: boolean = false;
  loaded: boolean = false;

  created() {
    this.tenantToken = this.$route.params.tenantToken;
    this.identifier = this.$route.params.identifier;
    this.refresh();
  }

  // Called to refresh data.
  refresh() {
    this.loaded = false;

    // Load configuration data.
    if (this.identifier && this.tenantToken) {
      var component = this;
      getConfigurationModel(this.$store, this.identifier)
        .then(function(response) {
          component.configModel = response.data;
          var microservice = response.data.microserviceDetails;
          var section = {
            id: "tenants",
            title: "Manage Microservice",
            icon: "layer-group",
            route:
              "/tenants/" +
              component.tenantToken +
              "/" +
              microservice.identifier,
            longTitle: "Manage Tenant Microservice: " + microservice.name
          };
          component.loaded = true;
          component.$store.commit("currentSection", section);
        })
        .catch(function(e) {
          console.log(e);
        });
      getTenantConfiguration(this.$store, this.identifier, this.tenantToken)
        .then(function(response) {
          component.config = response.data;
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  }

  // Called when configuration is changed.
  onConfigurationUpdated() {
    this.dirty = true;
  }

  // Called when configuration is to be saved.
  onSaveConfiguration() {
    var component = this;
    if (this.config && this.identifier && this.tenantToken) {
      updateTenantConfiguration(
        this.$store,
        this.identifier,
        this.tenantToken,
        this.config
      )
        .then(function(response: AxiosResponse<void>) {
          component.dirty = false;
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  }

  // Called when configuration is to be reverted.
  onRevertConfiguration() {
    this.refresh();
    this.dirty = false;
  }

  // Navigate back to microservices list.
  onBackToList() {
    this.$router.push("/system/tenants/" + this.tenantToken);
  }
}
</script>

<style>
</style>
