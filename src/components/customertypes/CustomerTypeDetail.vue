<template>
  <detail-page
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
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, getCustomerType } from "sitewhere-ide-common";
import { DetailComponent, DetailPage } from "sitewhere-ide-components";

import CustomerTypeDetailHeader from "./CustomerTypeDetailHeader.vue";
import CustomerTypeCustomers from "./CustomerTypeCustomers.vue";
import CustomerTypeDeleteDialog from "./CustomerTypeDeleteDialog.vue";
import CustomerTypeUpdateDialog from "./CustomerTypeUpdateDialog.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import { ICustomerType, ICustomerTypeResponseFormat } from "sitewhere-rest-api";
import { CustomerTypesSection } from "../../libraries/constants";

@Component({
  components: {
    DetailPage,
    CustomerTypeDetailHeader,
    CustomerTypeCustomers,
    CustomerTypeDeleteDialog,
    CustomerTypeUpdateDialog,
    EditButton,
    DeleteButton
  }
})
export default class CustomerTypeDetail extends DetailComponent<ICustomerType> {
  @Ref() readonly edit!: CustomerTypeUpdateDialog;
  @Ref() readonly delete!: CustomerTypeDeleteDialog;

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
  beforeRouteUpdate(to: any, from: any, next: any) {
    this.display(to.params.token);
    next();
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<ICustomerType> {
    const format: ICustomerTypeResponseFormat = {};
    return getCustomerType(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded() {
    this.$store.commit("currentSection", CustomerTypesSection);
  }

  /** Called to open customer type edit dialog */
  onEdit() {
    if (this.token) {
      this.edit.open(this.token);
    }
  }

  /** Called when customer type is updated */
  onCustomerTypeUpdated() {
    this.refresh();
  }

  /** Called to open delete dialog */
  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  /** Called when customer type is deleted */
  onCustomerTypeDeleted() {
    routeTo(this, "/customertypes");
  }
}
</script>
