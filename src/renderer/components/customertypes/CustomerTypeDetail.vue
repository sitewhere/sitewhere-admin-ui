<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading customer type ..."
    :loaded="loaded"
    :record="customerType"
  >
    <template slot="header">
      <customer-type-detail-header
        :record="customerType"
        @customerTypeDeleted="onCustomerTypeDeleted"
        @customerTypeUpdated="onCustomerTypeUpdated"
      />
    </template>
    <template slot="tabs">
      <v-tab key="instances">Customers of Type</v-tab>
    </template>
    <template slot="tab-items">
      <customer-type-customers key="instances" :customerTypeToken="token" />
    </template>
    <template slot="dialogs">
      <customer-type-update-dialog
        ref="edit"
        :token="token"
        @customerTypeUpdated="onCustomerTypeUpdated"
      />
      <customer-type-delete-dialog
        ref="delete"
        :token="token"
        @customerTypeDeleted="onCustomerTypeDeleted"
      />
    </template>
    <template slot="actions">
      <edit-button tooltip="Edit Customer Type" @action="onEdit" />
      <delete-button tooltip="Delete Customer Type" @action="onDelete" />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  DialogComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import CustomerTypeDetailHeader from "./CustomerTypeDetailHeader.vue";
import CustomerTypeCustomers from "./CustomerTypeCustomers.vue";
import CustomerTypeDeleteDialog from "./CustomerTypeDeleteDialog.vue";
import CustomerTypeUpdateDialog from "./CustomerTypeUpdateDialog.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { Route } from "vue-router";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getCustomerType } from "../../rest/sitewhere-customer-types-api";
import { ICustomerType, ICustomerTypeResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    CustomerTypeDetailHeader,
    CustomerTypeCustomers,
    CustomerTypeDeleteDialog,
    CustomerTypeUpdateDialog,
    EditButton,
    DeleteButton
  }
})
export default class CustomerTypeDetail extends DetailComponent<ICustomerType> {
  // References.
  $refs!: Refs<{
    edit: CustomerTypeUpdateDialog;
    delete: DialogComponent<ICustomerType>;
  }>;

  get customerType(): ICustomerType | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.CustomerType;
  }

  get title(): string {
    return this.customerType ? this.customerType.name : "";
  }

  /** Called when component is reused */
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    this.display(to.params.token);
    next();
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<ICustomerType> {
    let format: ICustomerTypeResponseFormat = {};
    return getCustomerType(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(customerType: ICustomerType) {
    var section: INavigationSection = {
      id: "customertypes",
      title: "Customer Types",
      icon: "cog",
      route: "/admin/customertypes/" + customerType.token,
      longTitle: "Manage Customer Type: " + customerType.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called to open customer type edit dialog.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called when customer type is updated.
  onCustomerTypeUpdated() {
    this.refresh();
  }

  onDelete() {
    (this.$refs["delete"] as any).showDeleteDialog();
  }

  // Called when customer type is deleted.
  onCustomerTypeDeleted() {
    routeTo(this, "/customertypes");
  }
}
</script>
