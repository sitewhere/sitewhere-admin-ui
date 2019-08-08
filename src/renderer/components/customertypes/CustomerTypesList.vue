<template>
  <sw-list-page
    :icon="icon"
    title="Customer Types"
    loadingMessage="Loading customer types ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(customerType) in matches" :key="customerType.token">
        <customer-type-list-entry :customerType="customerType" @open="onOpenCustomerType" />
      </v-flex>
    </sw-list-layout>
    <template slot="dialogs">
      <customer-type-create-dialog ref="add" @customerTypeAdded="refresh" :customerTypes="matches" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Customer Type" @action="onAddCustomerType" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import CustomerTypeListEntry from "./CustomerTypeListEntry.vue";
import CustomerTypeCreateDialog from "./CustomerTypeCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";

import { routeTo } from "../common/Utils";
import { NavigationIcon } from "../../libraries/constants";
import { AxiosPromise } from "axios";
import { listCustomerTypes } from "../../rest/sitewhere-customer-types-api";
import {
  ICustomerType,
  ICustomerTypeSearchCriteria,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    CustomerTypeListEntry,
    CustomerTypeCreateDialog,
    AddButton
  }
})
export default class CustomerTypesList extends ListComponent<
  ICustomerType,
  ICustomerTypeSearchCriteria,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchResults
> {
  $refs!: Refs<{
    add: CustomerTypeCreateDialog;
  }>;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.CustomerType;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): ICustomerTypeSearchCriteria {
    let criteria: ICustomerTypeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ICustomerTypeResponseFormat {
    let format: ICustomerTypeResponseFormat = {};
    format.includeContainedCustomerTypes = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: ICustomerTypeSearchCriteria,
    format: ICustomerTypeResponseFormat
  ): AxiosPromise<ICustomerTypeSearchResults> {
    return listCustomerTypes(this.$store, criteria, format);
  }

  // Called when a customer type is clicked.
  onOpenCustomerType(customerType: ICustomerType) {
    routeTo(this, "/customertypes/" + customerType.token);
  }

  // Called to open dialog.
  onAddCustomerType() {
    this.$refs.add.open();
  }
}
</script>
