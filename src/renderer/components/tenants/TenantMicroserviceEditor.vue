<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading microservice configuration ..."
    :loaded="loaded"
    :record="tenant"
  >
    <template slot="header">
      <unsaved-updates-warning
        class="mb-3"
        :unsaved="dirty"
        @save="onSaveConfiguration"
        @revert="onRevertConfiguration"
      />
    </template>
    <template slot="tabs">
      <v-tab key="configuration">Configuration</v-tab>
      <v-tab key="scripts">Scripts</v-tab>
      <v-tab key="runtime">Runtime</v-tab>
    </template>
    <template slot="tab-items">
      <microservice-editor
        tabkey="configuration"
        :configuration="configuration"
        :configurationModel="configurationModel"
        :identifier="identifier"
        :tenantToken="tenantToken"
        @dirty="onConfigurationUpdated"
      />
      <scripts-manager tabkey="scripts" :identifier="identifier"/>
      <v-tab-item key="runtime">
        <tenant-runtimes-block class="ma-1" :identifier="identifier" :tenantToken="tenantToken"/>
      </v-tab-item>
    </template>
    <template slot="actions">
      <sw-navigation-action-button
        icon="arrow-left"
        tooltip="Back To Tenant Microservices"
        @action="onBackToList"
      />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import Vue from "vue";

import TenantRuntimesBlock from "./TenantRuntimesBlock.vue";
import MicroserviceEditor from "../microservice/MicroserviceEditor.vue";
import UnsavedUpdatesWarning from "../microservice/UnsavedUpdatesWarning.vue";
import ScriptsManager from "../microservice/ScriptsManager.vue";

import { NavigationIcon } from "../../libraries/constants";
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
    TenantRuntimesBlock,
    MicroserviceEditor,
    UnsavedUpdatesWarning,
    ScriptsManager
  }
})
export default class TenantMicroserviceEditor extends Vue implements WithRoute {
  tenantToken: string | null = null;
  identifier: string | null = null;
  configuration: IElementContent | null = null;
  configurationModel: IConfigurationModel | null = null;
  tenant: ITenant | null = null;
  dirty: boolean = false;
  loaded: boolean = false;

  created() {
    this.tenantToken = this.$route.params.token;
    this.identifier = this.$route.params.identifier;
    this.refresh();
  }

  /** Get icon shown in title bar */
  get icon() {
    return NavigationIcon.Tenant;
  }

  /** Get title shown in title bar */
  get title() {
    return this.configurationModel
      ? this.configurationModel.microserviceDetails.name +
          " Microservice Configuration"
      : "Tenant Microservice Configuration";
  }

  /** Refresh all data */
  async refresh() {
    this.loaded = false;
    await Promise.all([
      this.refreshModel(),
      this.refreshConfiguration(),
      this.refreshTenant()
    ]);
    this.loaded = true;
  }

  /** Refresh configuration model */
  async refreshModel() {
    if (this.identifier) {
      try {
        let response: AxiosResponse<
          IConfigurationModel
        > = await getConfigurationModel(this.$store, this.identifier);
        this.configurationModel = response.data;
      } catch (err) {
        handleError(err);
      }
    }
  }

  /** Refresh configuration data */
  async refreshConfiguration() {
    if (this.identifier && this.tenantToken) {
      try {
        let configResponse: AxiosResponse<
          IElementContent
        > = await getTenantConfiguration(
          this.$store,
          this.identifier,
          this.tenantToken
        );
        this.configuration = configResponse.data;
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
    if (this.configuration && this.identifier && this.tenantToken) {
      updateTenantConfiguration(
        this.$store,
        this.identifier,
        this.tenantToken,
        this.configuration
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
    this.loaded = false;
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
