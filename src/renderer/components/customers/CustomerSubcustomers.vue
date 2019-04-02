<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="(customer) in matches" :key="customer.token">
        <customer-list-entry :customer="customer" @openCustomer="onOpenCustomer"/>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <customer-create-dialog @customerAdded="refresh" :parentCustomer="customer"/>
    </template>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";

import ListTab from "../common/ListTab.vue";
import ListLayout from "../common/ListLayout.vue";
import CustomerListEntry from "./CustomerListEntry.vue";
import CustomerCreateDialog from "./CustomerCreateDialog.vue";

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
} from "sitewhere-rest-api";

@Component({
  components: {
    ListTab,
    ListLayout,
    CustomerListEntry,
    CustomerCreateDialog
  }
})
export default class CustomerSubcustomers extends ListComponent<
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly customer!: ICustomer;

  /** Build search criteria for list */
  buildSearchCriteria(): ICustomerSearchCriteria {
    let criteria: ICustomerSearchCriteria = {};
    criteria.rootOnly = false;
    criteria.parentCustomerToken = this.customer.token;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ICustomerResponseFormat {
    let format: ICustomerResponseFormat = {};
    format.includeCustomerType = true;
    format.includeParentCustomer = false;
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

  /** Open device assignment detail page */
  onOpenCustomer(customer: ICustomer) {
    routeTo(this, "/customers/" + customer.token);
  }
}
</script>

<style scoped>
</style>
