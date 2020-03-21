<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    :tabsOnBottom="true"
    loadingMessage="Loading tenant engine configuration ..."
    :loaded="loaded"
    :record="tenant"
  >
    <template slot="header">
      <unsaved-updates-panel
        v-if="dirty"
        @revert="onRevertConfiguration"
        @save="onSaveConfiguration"
      />
    </template>
    <template slot="tabs">
      <v-tab key="configuration">Configuration</v-tab>
      <v-tab key="scripts">Scripts</v-tab>
      <v-tab key="json">JSON</v-tab>
    </template>
    <template slot="tab-items">
      <tenant-engine-configuration
        :configuration="workingCopy"
        tabkey="configuration"
        @dirty="checkDirty"
      />
      <scripts-manager tabkey="scripts" :identifier="identifier" />
      <tenant-engine-source :configuration="workingCopy" tabkey="json" />
    </template>
    <template slot="actions">
      <sw-navigation-action-button
        icon="fa-arrow-left"
        tooltip="Back To Tenant Microservices"
        @action="onBackToList"
      />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import Vue from "vue";

import ScriptsManager from "../microservice/ScriptsManager.vue";
import TenantEngineConfiguration from "./TenantEngineConfiguration.vue";
import TenantEngineSource from "./TenantEngineSource.vue";
import UnsavedUpdatesPanel from "./UnsavedUpdatesPanel.vue";

import { AxiosResponse } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { Component, WithRoute, Watch } from "sitewhere-ide-common";
import {
  ITenantEngineConfiguration,
  ITenant,
  IMicroserviceSummary
} from "sitewhere-rest-api";
import { getTenantEngineConfiguration } from "../../rest/sitewhere-instance-api";

@Component({
  components: {
    ScriptsManager,
    TenantEngineConfiguration,
    TenantEngineSource,
    UnsavedUpdatesPanel
  }
})
export default class TenantEngineEditor extends Vue implements WithRoute {
  tenantToken: string | null = null;
  identifier: string | null = null;
  configuration: ITenantEngineConfiguration | null = null;
  dirty: boolean = false;
  loaded: boolean = false;

  /** Tracks updated configuration */
  workingCopy: ITenantEngineConfiguration | null = null;

  /** Creates a working copy of the configuration */
  @Watch("configuration", { immediate: true })
  onConfigurationUpdated(updated: ITenantEngineConfiguration) {
    this.workingCopy = JSON.parse(JSON.stringify(updated));
  }

  created() {
    this.tenantToken = this.$route.params.token;
    this.identifier = this.$route.params.identifier;
    this.refresh();
  }

  /**
   * Get tenant information.
   */
  get tenant(): ITenant | null {
    return this.configuration ? this.configuration.tenant : null;
  }

  /**
   * Get microservice information.
   */
  get microservice(): IMicroserviceSummary | null {
    return this.configuration ? this.configuration.microservice : null;
  }

  /** Get icon shown in title bar */
  get icon() {
    return this.microservice ? this.microservice.icon : NavigationIcon.Tenant;
  }

  /** Get title shown in title bar */
  get title() {
    return this.tenant && this.microservice
      ? `${this.microservice.name} (${this.tenant.name})`
      : "";
  }

  /** Refresh all data */
  async refresh() {
    if (this.identifier && this.tenantToken) {
      this.loaded = false;
      let response: AxiosResponse<ITenantEngineConfiguration> = await getTenantEngineConfiguration(
        this.$store,
        this.identifier,
        this.tenantToken
      );
      this.configuration = response.data;
      this.loaded = true;
    }
  }

  /** Reverts to saved configuration */
  onRevertConfiguration(): void {
    if (this.configuration) {
      this.onConfigurationUpdated(this.configuration);
      this.dirty = false;
    }
  }

  /** Called to save configuration updates */
  async onSaveConfiguration() {
    if (this.workingCopy) {
      // let response: AxiosResponse<ITenantEngineConfiguration> = await updateInstanceConfiguration(
      //   this.$store,
      //   this.workingCopy
      // );
      // this.configuration = response.data;
      // this.onConfigurationUpdated(this.configuration);
      // this.dirty = false;
    }
  }

  /** Compares original with working copy for dirty check */
  checkDirty() {
    let orig: string = JSON.stringify(this.configuration);
    let work: string = JSON.stringify(this.workingCopy);
    this.dirty = orig != work;
  }

  /** Navigate back to microservices list */
  onBackToList() {
    this.$router.push("/system/tenants/" + this.tenantToken);
  }
}
</script>

<style></style>
