<template>
  <sw-detail-page
    :icon="icon"
    title="Manage Global Microservice"
    loadingMessage="Loading microservice configuration ..."
    :loaded="loaded"
    :record="configuration"
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
    </template>
    <template slot="tab-items">
      <microservice-editor
        tabkey="configuration"
        :configuration="configuration"
        :configurationModel="configurationModel"
        :identifier="identifier"
        @dirty="onConfigurationUpdated"
      />
      <scripts-manager tabkey="scripts" :identifier="identifier" />
    </template>
    <template slot="actions">
      <sw-navigation-action-button
        icon="arrow-left"
        tooltip="Back To Global Microservices"
        @action="onBackToList"
      />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection
} from "sitewhere-ide-common";

import MicroserviceEditor from "../microservice/MicroserviceEditor.vue";
import UnsavedUpdatesWarning from "../microservice/UnsavedUpdatesWarning.vue";
import ScriptsManager from "../microservice/ScriptsManager.vue";

import { handleError } from "../common/Utils";
import { AxiosPromise, AxiosResponse } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import {
  getConfigurationModel,
  getGlobalConfiguration,
  updateGlobalConfiguration
} from "../../rest/sitewhere-instance-api";
import { IConfigurationModel, IElementContent } from "sitewhere-rest-api";

@Component({
  components: {
    MicroserviceEditor,
    UnsavedUpdatesWarning,
    ScriptsManager
  }
})
export default class GlobalMicroserviceEditor extends DetailComponent<
  IConfigurationModel
> {
  configuration: IElementContent | null = null;
  dirty: boolean = false;

  get configurationModel(): IConfigurationModel | null {
    return this.record;
  }

  get identifier(): string | null {
    return this.record ? this.record.microserviceDetails.identifier : null;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Tenant;
  }

  // Get parameter for route token.
  getTokenParameter(): string {
    return "identifier";
  }

  /** Load record */
  loadRecord(identifier: string): AxiosPromise<IConfigurationModel> {
    this.refreshGlobalConfiguration(identifier);
    return getConfigurationModel(this.$store, identifier);
  }

  /** Called after data is loaded */
  afterRecordLoaded(record: IConfigurationModel) {
    var section: INavigationSection = {
      id: "global",
      title: "Manage Microservice",
      icon: record.microserviceDetails.icon,
      route: "/system/microservices/" + record.microserviceDetails.identifier,
      longTitle:
        "Manage Global Microservice: " + record.microserviceDetails.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called to refresh data.
  async refreshGlobalConfiguration(identifier: string) {
    try {
      let response: AxiosResponse<
        IElementContent
      > = await getGlobalConfiguration(this.$store, identifier);
      this.configuration = response.data;
    } catch (err) {
      handleError(err);
    }
  }

  // Called when configuration is changed.
  onConfigurationUpdated() {
    this.dirty = true;
  }

  // Called when configuration is to be saved.
  onSaveConfiguration() {
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
  }

  // Called when configuration is to be reverted.
  onRevertConfiguration() {
    this.refresh();
    this.$data.dirty = false;
  }

  // Navigate back to microservices list.
  onBackToList() {
    this.$router.push("/system/microservices");
  }
}
</script>
