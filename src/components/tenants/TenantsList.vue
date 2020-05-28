<template>
  <list-page
    :icon="icon"
    title="Manage Tenants"
    loadingMessage="Loading tenant list ..."
    :results="results"
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs12 v-for="tenant in matches" :key="tenant.token">
        <tenant-list-entry
          :tenant="tenant"
          @click="onOpenTenant(tenant)"
          @openTenant="onOpenTenant(tenant)"
          @configureTenant="onConfigureTenant(tenant)"
        ></tenant-list-entry>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <tenant-create-dialog ref="add" @tenantAdded="refresh" />
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Tenant" @action="onAddTenant" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, listTenants } from "sitewhere-ide-common";
import {
  ListPage,
  ListComponent,
  ListLayout,
  NavigationActionButton
} from "sitewhere-ide-components";

import TenantListEntry from "./TenantListEntry.vue";
import TenantCreateDialog from "./TenantCreateDialog.vue";

import { AxiosPromise } from "axios";
import {
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    TenantListEntry,
    TenantCreateDialog,
    ListPage,
    ListLayout,
    NavigationActionButton
  }
})
export default class TenantsList extends ListComponent<
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantSearchResults
> {
  @Ref() readonly add!: TenantCreateDialog;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Tenant;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): ITenantSearchCriteria {
    const criteria: ITenantSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ITenantResponseFormat {
    const format: ITenantResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: ITenantSearchCriteria,
    format: ITenantResponseFormat
  ): AxiosPromise<ITenantSearchResults> {
    return listTenants(this.$store, criteria, format);
  }

  // Called to open dialog.
  onAddTenant() {
    this.add.open();
  }

  // Called to open tenant detail.
  onConfigureTenant(tenant: ITenant) {
    this.$store.commit("selectedTenant", tenant);
    this.$router.push("/system/tenants/" + tenant.token);
  }
}
</script>
