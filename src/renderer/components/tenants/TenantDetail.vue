<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading tenant ..."
    :loaded="loaded"
    :record="tenant"
  >
    <template slot="header">
      <tenant-detail-header :record="tenant" />
    </template>
    <template slot="tabs">
      <v-tab key="microservices">Microservices</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="microservices">
        <microservice-list :topology="tenantTopology" @microserviceClicked="onMicroserviceClicked" />
      </v-tab-item>
    </template>
    <template slot="actions">
      <sw-navigation-action-button icon="edit" tooltip="Edit Tenant" @action="onEdit" />
      <sw-navigation-action-button icon="times" tooltip="Delete Tenant" @action="onDelete" />
    </template>
    <template slot="dialogs">
      <tenant-update-dialog ref="edit" :tenantToken="token" @tenantUpdated="onTenantEdited" />
      <tenant-delete-dialog ref="delete" :tenantToken="token" @deleted="onTenantDeleted" />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import TenantDetailHeader from "./TenantDetailHeader.vue";
import TenantUpdateDialog from "./TenantUpdateDialog.vue";
import TenantDeleteDialog from "./TenantDeleteDialog.vue";
import MicroserviceList from "../microservice/MicroserviceList.vue";

import { handleError } from "../common/Utils";
import { AxiosPromise, AxiosResponse } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getTenant } from "../../rest/sitewhere-tenants-api";
import { getTenantTopology } from "../../rest/sitewhere-instance-api";
import {
  ITenant,
  ITenantResponseFormat,
  IInstanceTopologySummary
} from "sitewhere-rest-api";

@Component({
  components: {
    TenantDetailHeader,
    TenantUpdateDialog,
    TenantDeleteDialog,
    MicroserviceList
  }
})
export default class TenantDetail extends DetailComponent<ITenant> {
  tenantTopology: IInstanceTopologySummary[] = [];

  // References.
  $refs!: Refs<{
    edit: TenantUpdateDialog;
    delete: TenantDeleteDialog;
  }>;

  get tenant(): ITenant | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Tenant;
  }

  get title(): string {
    return this.tenant ? `Manage tenant ${this.tenant.token}` : "Manage tenant";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<ITenant> {
    this.refreshTopology();
    let format: ITenantResponseFormat = {};
    return getTenant(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded(tenant: ITenant) {
    var section: INavigationSection = {
      id: "tenants",
      title: "Manage Tenant",
      icon: "layer-group",
      route: "/tenants/" + tenant.token,
      longTitle: "Manage Tenant: " + tenant.token
    };
    this.$store.commit("currentSection", section);
  }

  /** Called if a microservice is clicked */
  onMicroserviceClicked(microservice: IInstanceTopologySummary) {
    if (this.tenant) {
      this.$router.push(
        "/system/tenants/" + this.tenant.token + "/" + microservice.identifier
      );
    }
  }

  // Called to refresh data.
  async refreshTopology() {
    try {
      let response: AxiosResponse<
        IInstanceTopologySummary[]
      > = await getTenantTopology(this.$store);
      this.tenantTopology = response.data;
    } catch (err) {
      handleError(err);
    }
  }

  // Called to edit tenant.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called after tenant is edited.
  onTenantEdited() {
    this.refresh();
  }

  // Called to delete tenant.
  onDelete() {
    if (this.token) {
      this.$refs.delete.open(this.token);
    }
  }

  // Called after tenant is deleted.
  onTenantDeleted() {
    this.$router.push("/system/tenants");
  }
}
</script>

<style>
</style>
