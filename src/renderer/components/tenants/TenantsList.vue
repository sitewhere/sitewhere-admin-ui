<template>
  <sw-list-page
    :icon="icon"
    title="Manage Tenants"
    loadingMessage="Loading tenant list ..."
    :results="results"
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs12 v-for="(tenant) in matches" :key="tenant.token">
        <tenant-list-entry
          :tenant="tenant"
          @click="onOpenTenant(tenant)"
          @openTenant="onOpenTenant(tenant)"
          @configureTenant="onConfigureTenant(tenant)"
        ></tenant-list-entry>
      </v-flex>
    </sw-list-layout>
    <template slot="dialogs">
      <tenant-create-dialog ref="add" @tenantAdded="refresh" />
    </template>
    <template slot="actions">
      <sw-navigation-action-button icon="plus" tooltip="Add Tenant" @action="onAddTenant" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import TenantListEntry from "./TenantListEntry.vue";
import TenantCreateDialog from "./TenantCreateDialog.vue";

import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { listTenants } from "../../rest/sitewhere-tenants-api";
import {
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    TenantListEntry,
    TenantCreateDialog
  }
})
export default class TenantsList extends ListComponent<
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantSearchResults
> {
  $refs!: Refs<{
    add: TenantCreateDialog;
  }>;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Tenant;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): ITenantSearchCriteria {
    let criteria: ITenantSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ITenantResponseFormat {
    let format: ITenantResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: ITenantSearchCriteria,
    format: ITenantResponseFormat
  ): AxiosPromise<ITenantSearchResults> {
    return listTenants(this.$store, criteria, format);
  }

  // Called to open tenant management for tenant.
  onOpenTenant(tenant: ITenant) {
    this.$store.commit("selectedTenant", tenant);
    this.$router.push("/tenants/" + tenant.token + "/areas");
  }

  // Called to open dialog.
  onAddTenant() {
    this.$refs.add.open();
  }

  // Called to open tenant detail.
  onConfigureTenant(tenant: ITenant) {
    this.$router.push("/system/tenants/" + tenant.token);
  }
}
</script>

<style scoped>
</style>
