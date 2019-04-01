<template>
  <list-page
    :icon="icon"
    title="Manage Tenants"
    loadingMessage="Loading tenant list ..."
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs12 v-for="(tenant) in matches" :key="tenant.token">
        <tenant-list-entry
          :tenant="tenant"
          @click="onOpenTenant(tenant)"
          @openTenant="onOpenTenant(tenant)"
          @configureTenant="onConfigureTenant(tenant)"
        ></tenant-list-entry>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <tenant-create-dialog ref="add" @tenantAdded="refresh"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Tenant" @action="onAddTenant"/>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import ListLayout from "../common/ListLayout.vue";
import TenantListEntry from "./TenantListEntry.vue";
import TenantCreateDialog from "./TenantCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { Refs } from "../../libraries/navigation-model";
import { NavigationIcon } from "../../libraries/constants";
import { listTenants } from "../../rest/sitewhere-tenants-api";
import {
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantSearchResults
} from "sitewhere-rest-api";

export class TenantListComponent extends ListComponent<
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantSearchResults
> {}

@Component({
  components: {
    ListPage,
    ListLayout,
    TenantListEntry,
    TenantCreateDialog,
    NavigationActionButton
  }
})
export default class TenantsList extends Mixins(TenantListComponent) {
  $refs!: Refs<{
    add: any;
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
    store: Store<SiteWhereUiSettings>,
    criteria: ITenantSearchCriteria,
    format: ITenantResponseFormat
  ): AxiosPromise<ITenantSearchResults> {
    return listTenants(store, criteria, format);
  }

  // Called to open tenant management for tenant.
  onOpenTenant(tenant: ITenant) {
    this.$store.commit("selectedTenant", tenant);
    this.$router.push("/tenants/" + tenant.token + "/areas");
  }

  // Called to open dialog.
  onAddTenant() {
    console.log(this);
    this.$refs.add.onOpenDialog();
  }

  // Called to open tenant detail.
  onConfigureTenant(tenant: ITenant) {
    this.$router.push("/system/tenants/" + tenant.token);
  }
}
</script>

<style scoped>
</style>
