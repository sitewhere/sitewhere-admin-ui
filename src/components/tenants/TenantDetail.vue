<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading tenant ..."
    :loaded="loaded"
    :record="tenant"
  >
    <template slot="header">
      <tenant-detail-header :record="tenant" />
      <v-divider />
      <v-btn dark depressed tile block color="#060" @click="onOpenTenant(tenant)">
        View Tenant Data
        <v-icon class="pl-4">fa-chevron-right</v-icon>
      </v-btn>
    </template>
    <template slot="tabs">
      <v-tab key="microservices">Microservices</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="microservices" eager>
        <microservice-list
          :microservices="microservices"
          @microserviceClicked="onMicroserviceClicked"
        />
      </v-tab-item>
    </template>
    <template slot="actions">
      <navigation-action-button icon="fa-edit" tooltip="Edit Tenant" @action="onEdit" />
      <navigation-action-button icon="fa-trash" tooltip="Delete Tenant" @action="onDelete" />
    </template>
    <template slot="dialogs">
      <tenant-update-dialog ref="edit" :tenantToken="token" @tenantUpdated="onTenantEdited" />
      <tenant-delete-dialog ref="delete" :tenantToken="token" @deleted="onTenantDeleted" />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import {
  INavigationSection,
  NavigationIcon,
  getTenant,
  getInstanceMicroservices
} from "sitewhere-ide-common";
import {
  DetailComponent,
  DetailPage,
  NavigationActionButton
} from "sitewhere-ide-components";

import TenantDetailHeader from "./TenantDetailHeader.vue";
import TenantUpdateDialog from "./TenantUpdateDialog.vue";
import TenantDeleteDialog from "./TenantDeleteDialog.vue";
import MicroserviceList from "./MicroserviceList.vue";

import { AxiosPromise, AxiosResponse } from "axios";
import {
  ITenant,
  ITenantResponseFormat,
  IMicroserviceSummary
} from "sitewhere-rest-api";

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    TenantDetailHeader,
    TenantUpdateDialog,
    TenantDeleteDialog,
    MicroserviceList
  }
})
export default class TenantDetail extends DetailComponent<ITenant> {
  @Ref() readonly edit!: TenantUpdateDialog;
  @Ref() readonly delete!: TenantDeleteDialog;

  microservices: IMicroserviceSummary[] = [];

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
    const format: ITenantResponseFormat = {};
    return getTenant(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded(tenant: ITenant) {
    this.loadMicroserviceList();
    const section: INavigationSection = {
      id: "tenants",
      title: "Manage Tenant",
      icon: "layer-group",
      route: "/tenants/" + tenant.token,
      longTitle: "Manage Tenant: " + tenant.token
    };
    this.$store.commit("currentSection", section);
  }

  /**
   * Load list of microservices which will be displayed.
   */
  async loadMicroserviceList() {
    const response: AxiosResponse<IMicroserviceSummary[]> = await getInstanceMicroservices(
      this.$store
    );
    this.microservices = response.data;
  }

  /**
   * Called when a microservice from the list is clicked.
   */
  onMicroserviceClicked(microservice: IMicroserviceSummary) {
    this.$router.push(
      `/system/tenants/${this.token}/${microservice.functionalArea}`
    );
  }

  /** Called to edit tenant */
  onEdit() {
    if (this.token) {
      this.edit.open(this.token);
    }
  }

  /** Called after tenant is edited */
  onTenantEdited() {
    this.refresh();
  }

  /** Called to delete tenant */
  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  /** Called after tenant is deleted */
  onTenantDeleted() {
    this.$router.push("/system/tenants");
  }

  /** Called to open tenant management for tenant */
  onOpenTenant(tenant: ITenant) {
    this.$store.commit("selectedTenant", tenant);
    this.$router.push("/tenants/" + tenant.token + "/areas");
  }
}
</script>
