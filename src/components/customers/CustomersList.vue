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
      <v-flex xs6 v-for="customer in matches" :key="customer.token">
        <customer-list-entry :customer="customer" @open="onOpenCustomer" />
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No customers have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{ addIcon }}</v-icon>in the toolbar to add a customer.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <customer-create-dialog ref="add" @customerAdded="onCustomerAdded" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Customer" @action="onAddCustomer" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, listCustomers } from "sitewhere-ide-common";
import { ListComponent, ListPage, ListLayout } from "sitewhere-ide-components";

import CustomerListEntry from "./CustomerListEntry.vue";
import CustomerCreateDialog from "./CustomerCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
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
    AddButton,
    NoResultsPanel
  }
})
export default class CustomersList extends ListComponent<
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults
> {
  @Ref() readonly add!: CustomerCreateDialog;

  addIcon: string = NavigationIcon.Add;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Customer;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): ICustomerSearchCriteria {
    const criteria: ICustomerSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ICustomerResponseFormat {
    const format: ICustomerResponseFormat = {};
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
    this.add.open();
  }

  // Called when a new customer is added.
  onCustomerAdded() {
    this.refresh();
  }
}
</script>

<style scoped></style>
