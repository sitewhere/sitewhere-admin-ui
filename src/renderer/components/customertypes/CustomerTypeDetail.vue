<template>
  <detail-page
    icon="cog"
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
    <v-tabs v-model="active">
      <v-tabs-bar dark color="primary">
        <v-tabs-item key="instances" href="#instances">Customers of Type</v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content key="instances" id="instances">
          <v-container fluid grid-list-md v-if="customers">
            <v-layout row wrap>
              <v-flex xs6 v-for="(customer) in customers" :key="customer.token">
                <customer-list-entry :customer="customer" @openCustomer="onOpenCustomer"></customer-list-entry>
              </v-flex>
            </v-layout>
          </v-container>
          <pager :results="results" @pagingUpdated="updatePaging">
            <no-results-panel slot="noresults" text="No Customers of This Type Found"></no-results-panel>
          </pager>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    <template slot="dialogs">
      <customer-type-update-dialog
        ref="edit"
        :token="token"
        :customerTypes="customerTypes"
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
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import DetailPage from "../common/DetailPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";
import CustomerTypeDetailHeader from "./CustomerTypeDetailHeader.vue";
import CustomerTypeDeleteDialog from "./CustomerTypeDeleteDialog.vue";
import CustomerTypeUpdateDialog from "./CustomerTypeUpdateDialog.vue";
import CustomerListEntry from "../customers/CustomerListEntry.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { INavigationSection } from "../../libraries/navigation-model";
import { getCustomerType } from "../../rest/sitewhere-customer-types-api";
import {
  ICustomerType,
  ICustomerTypeResponseFormat
} from "sitewhere-rest-api/dist/model/customer-types-model";

export class CustomerTypeDetailComponent extends DetailComponent<
  ICustomerType
> {}

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    NoResultsPanel,
    CustomerTypeDetailHeader,
    CustomerListEntry,
    CustomerTypeDeleteDialog,
    CustomerTypeUpdateDialog
  }
})
export default class CustomerTypeDetail extends Mixins(
  CustomerTypeDetailComponent
) {
  active: string | null = null;

  get customerType(): ICustomerType | null {
    return this.record;
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
