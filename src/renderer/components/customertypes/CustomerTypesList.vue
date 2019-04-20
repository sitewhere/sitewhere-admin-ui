<template>
  <list-page
    :icon="icon"
    title="Customer Types"
    loadingMessage="Loading customer types ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="(customerType) in matches" :key="customerType.token">
        <customer-type-list-entry
          :customerType="customerType"
          @openCustomerType="onOpenCustomerType"
          @customerTypeDeleted="refresh"
        ></customer-type-list-entry>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <customer-type-create-dialog ref="add" @customerTypeAdded="refresh" :customerTypes="matches"/>
    </template>
    <template slot="actions">
      <navigation-action-button
        icon="plus"
        tooltip="Add Customer Type"
        @action="onAddCustomerType"
      />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import ListPage from "../common/ListPage.vue";
import ListLayout from "../common/ListLayout.vue";
import CustomerTypeListEntry from "./CustomerTypeListEntry.vue";
import CustomerTypeCreateDialog from "./CustomerTypeCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

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
    ListPage,
    ListLayout,
    CustomerTypeListEntry,
    CustomerTypeCreateDialog,
    NavigationActionButton
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

<style scoped>
</style>
