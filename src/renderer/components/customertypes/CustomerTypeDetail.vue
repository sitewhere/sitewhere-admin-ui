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
      <v-tab key="instances" href="#instances">Customers of Type</v-tab>
    </template>
    <template slot="tab-items">
      <customer-type-customers key="instances" id="instances" :customerTypeToken="token"/>
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
      <navigation-action-button icon="edit" tooltip="Edit Customer Type" @action="onEdit"></navigation-action-button>
      <navigation-action-button icon="times" tooltip="Delete Customer Type" @action="onDelete"></navigation-action-button>
    </template>
  </detail-page>
</template>

<script lang="ts">
import { DetailComponent } from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import DetailPage from "../common/DetailPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";
import CustomerTypeDetailHeader from "./CustomerTypeDetailHeader.vue";
import CustomerTypeCustomers from "./CustomerTypeCustomers.vue";
import CustomerTypeDeleteDialog from "./CustomerTypeDeleteDialog.vue";
import CustomerTypeUpdateDialog from "./CustomerTypeUpdateDialog.vue";
import CustomerListEntry from "../customers/CustomerListEntry.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection } from "../../libraries/navigation-model";
import { getCustomerType } from "../../rest/sitewhere-customer-types-api";
import { ICustomerType, ICustomerTypeResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    NoResultsPanel,
    CustomerTypeDetailHeader,
    CustomerTypeCustomers,
    CustomerListEntry,
    CustomerTypeDeleteDialog,
    CustomerTypeUpdateDialog
  }
})
export default class CustomerTypeDetail extends DetailComponent<ICustomerType> {
  active: string | null = null;

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

  /** Load record */
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<ICustomerType> {
    let format: ICustomerTypeResponseFormat = {};
    return getCustomerType(store, token, format);
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
    (this.$refs["edit"] as any).onOpenDialog();
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

<style scoped>
</style>
