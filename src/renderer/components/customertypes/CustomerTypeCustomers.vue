<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading customers ..."
  >
    <list-layout>
      <v-flex xs6 v-for="(customer) in matches" :key="customer.token">
        <customer-list-entry :customer="customer"></customer-list-entry>
      </v-flex>
    </list-layout>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop, ListComponent } from "sitewhere-ide-common";

import ListTab from "../common/ListTab.vue";
import ListLayout from "../common/ListLayout.vue";
import CustomerListEntry from "../customers/CustomerListEntry.vue";

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
    CustomerListEntry
  }
})
export default class CustomerTypeCustomers extends ListComponent<
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly customerTypeToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): ICustomerSearchCriteria {
    let criteria: ICustomerSearchCriteria = {};
    criteria.customerTypeToken = this.customerTypeToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ICustomerResponseFormat {
    let format: ICustomerResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: ICustomerSearchCriteria,
    format: ICustomerResponseFormat
  ): AxiosPromise<ICustomerSearchResults> {
    return listCustomers(this.$store, criteria, format);
  }
}
</script>

<style scoped>
</style>
