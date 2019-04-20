<template>
  <list-page
    :icon="icon"
    title="Customers"
    loadingMessage="Loading customers ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="(customer) in matches" :key="customer.token">
        <customer-list-entry :customer="customer" @openCustomer="onOpenCustomer"></customer-list-entry>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <customer-create-dialog ref="add" @customerAdded="onCustomerAdded"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Customer" @action="onAddCustomer"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import ListPage from "../common/ListPage.vue";
import ListLayout from "../common/ListLayout.vue";
import CustomerListEntry from "./CustomerListEntry.vue";
import CustomerCreateDialog from "./CustomerCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { NavigationIcon } from "../../libraries/constants";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listCustomers } from "../../rest/sitewhere-customers-api";
import {
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    CustomerListEntry,
    CustomerCreateDialog,
    NavigationActionButton
  }
})
export default class CustomersList extends ListComponent<
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults
> {
  $refs!: Refs<{
    add: CustomerCreateDialog;
  }>;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Customer;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): ICustomerSearchCriteria {
    let criteria: ICustomerSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ICustomerResponseFormat {
    let format: ICustomerResponseFormat = {};
    format.includeCustomerType = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: ICustomerSearchCriteria,
    format: ICustomerResponseFormat
  ): AxiosPromise<ICustomerSearchResults> {
    return listCustomers(this.$store, criteria, format);
  }

  // Called to open a customer.
  onOpenCustomer(customer: ICustomer) {
    routeTo(this, "/customers/" + customer.token);
  }

  // Called to open dialog.
  onAddCustomer() {
    this.$refs.add.open();
  }

  // Called when a new customer is added.
  onCustomerAdded() {
    this.refresh();
  }
}
</script>

<style scoped>
</style>
