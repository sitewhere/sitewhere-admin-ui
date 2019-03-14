<template>
  <list-page
    icon="building"
    title="Customers"
    loadingMessage="Loading customers ..."
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs6 v-for="(customer) in matches" :key="customer.token">
      <customer-list-entry :customer="customer" @openCustomer="onOpenCustomer"></customer-list-entry>
    </v-flex>
    <template slot="dialogs">
      <customer-create-dialog ref="add" @customerAdded="onCustomerAdded"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Customer" @action="onAddCustomer"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import CustomerListEntry from "./CustomerListEntry.vue";
import CustomerCreateDialog from "./CustomerCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listCustomers } from "../../rest/sitewhere-customers-api";
import {
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults
} from "sitewhere-rest-api/dist/model/customers-model";

export class CustomerListComponent extends ListComponent<
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults
> {}

@Component({
  components: {
    ListPage,
    CustomerListEntry,
    CustomerCreateDialog,
    NavigationActionButton
  }
})
export default class CustomersList extends Mixins(CustomerListComponent) {
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
    store: Store<SiteWhereUiSettings>,
    criteria: ICustomerSearchCriteria,
    format: ICustomerResponseFormat
  ): AxiosPromise<ICustomerSearchResults> {
    return listCustomers(store, criteria, format);
  }
  // Called to open a customer.
  onOpenCustomer(customer: ICustomer) {
    routeTo(this, "/customers/" + customer.token);
  }

  // Called to open dialog.
  onAddCustomer() {
    (this.$refs.add as any).onOpenDialog();
  }

  // Called when a new customer is added.
  onCustomerAdded() {
    this.refresh();
  }
}
</script>

<style scoped>
</style>
