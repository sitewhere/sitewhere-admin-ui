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

import NavigationPage from "../common/NavigationPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import TenantRuntimesBlock from "./TenantRuntimesBlock.vue";
import MicroserviceEditor from "../microservice/MicroserviceEditor.vue";
import UnsavedUpdatesWarning from "../microservice/UnsavedUpdatesWarning.vue";

import { handleError } from "../common/Utils";
import { Component, WithRoute } from "sitewhere-ide-common";
import { AxiosResponse } from "axios";
import {
  getConfigurationModel,
  getTenantConfiguration,
  updateTenantConfiguration
} from "../../rest/sitewhere-instance-api";
import {
  IConfigurationModel,
  IElementContent,
  ITenant,
  ITenantResponseFormat
} from "sitewhere-rest-api";
import { getTenant } from "../../rest/sitewhere-tenants-api";

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
  tenant: ITenant | null = null;
  dirty: boolean = false;
  loaded: boolean = false;

  created() {
    this.tenantToken = this.$route.params.tenantToken;
    this.identifier = this.$route.params.identifier;
    this.refreshModel();
    this.refreshConfiguration();
    this.refreshTenant();
  }

  // Called to refresh configuration model.
  async refreshModel() {
    if (this.identifier) {
      try {
        let response: AxiosResponse<
          IConfigurationModel
        > = await getConfigurationModel(this.$store, this.identifier);
        this.configModel = response.data;
        var microservice = response.data.microserviceDetails;
        var section = {
          id: "tenants",
          title: "Manage Microservice",
          icon: "layer-group",
          route: "/tenants/" + this.tenantToken + "/" + microservice.identifier,
          longTitle: "Manage Tenant Microservice: " + microservice.name
        };
        this.loaded = true;
        this.$store.commit("currentSection", section);
      } catch (err) {
        handleError(err);
      }
    }
  }

  // Called to refresh configuration data.
  async refreshConfiguration() {
    if (this.identifier && this.tenantToken) {
      this.loaded = false;
      try {
        let configResponse: AxiosResponse<
          IElementContent
        > = await getTenantConfiguration(
          this.$store,
          this.identifier,
          this.tenantToken
        );
        this.config = configResponse.data;
        this.loaded = true;
      } catch (err) {
        handleError(err);
      }
    }
  }

  // Called to refresh tenant information.
  async refreshTenant() {
    if (this.identifier && this.tenantToken) {
      try {
        let format: ITenantResponseFormat = {};
        let response: AxiosResponse<ITenant> = await getTenant(
          this.$store,
          this.tenantToken,
          format
        );
        this.tenant = response.data;
        this.$store.commit("selectedTenant", this.tenant);
      } catch (err) {
        handleError(err);
      }
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
    this.refreshConfiguration();
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
