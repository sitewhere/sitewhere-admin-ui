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
      <v-flex xs6 v-for="customer in matches" :key="customer.token">
        <customer-list-entry :customer="customer" @open="onOpenCustomer" />
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>There are no customers of this type.</div>
      </no-results-panel>
    </template>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { listCustomers } from "sitewhere-ide-common";
import { ListComponent, ListTab, ListLayout } from "sitewhere-ide-components";

import CustomerListEntry from "../customers/CustomerListEntry.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { AxiosPromise } from "axios";
import { routeTo } from "sitewhere-ide-common";
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
    NoResultsPanel
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
    const criteria: ICustomerSearchCriteria = {};
    criteria.customerTypeToken = this.customerTypeToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ICustomerResponseFormat {
    const format: ICustomerResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: ICustomerSearchCriteria,
    format: ICustomerResponseFormat
  ): AxiosPromise<ICustomerSearchResults> {
    return listCustomers(this.$store, criteria, format);
  }

  /** Called to open a customer */
  onOpenCustomer(customer: ICustomer) {
    routeTo(this, "/customers/" + customer.token);
  }
}
</script>
