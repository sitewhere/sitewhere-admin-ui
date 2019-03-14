<template>
  <list-page
    icon="cog"
    title="Customer Types"
    loadingMessage="Loading customer types ..."
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs6 v-for="(customerType) in matches" :key="customerType.token">
      <customer-type-list-entry
        :customerType="customerType"
        @customerTypeOpened="onOpenCustomerType"
        @customerTypeDeleted="refresh"
      ></customer-type-list-entry>
    </v-flex>
    <template slot="dialogs">
      <customer-type-create-dialog
        ref="add"
        @customerTypeAdded="refresh"
        :customerTypes="customerTypes"
      />
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Customer Type" @action="onAddCustomerType"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import CustomerTypeListEntry from "./CustomerTypeListEntry.vue";
import CustomerTypeCreateDialog from "./CustomerTypeCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { routeTo } from "../common/Utils";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listCustomerTypes } from "../../rest/sitewhere-customer-types-api";
import {
  ICustomerType,
  ICustomerTypeSearchCriteria,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchResults
} from "sitewhere-rest-api/dist/model/customer-types-model";

export class CustomerTypeListComponent extends ListComponent<
  ICustomerType,
  ICustomerTypeSearchCriteria,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchResults
> {}

@Component({
  components: {
    ListPage,
    CustomerTypeListEntry,
    CustomerTypeCreateDialog,
    NavigationActionButton
  }
})
export default class CustomerTypesList extends Mixins(
  CustomerTypeListComponent
) {
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
    store: Store<SiteWhereUiSettings>,
    criteria: ICustomerTypeSearchCriteria,
    format: ICustomerTypeResponseFormat
  ): AxiosPromise<ICustomerTypeSearchResults> {
    return listCustomerTypes(store, criteria, format);
  }

  // Called when a customer type is clicked.
  onOpenCustomerType(customerType: ICustomerType) {
    routeTo(this, "/customertypes/" + customerType.token);
  }

  // Called to open dialog.
  onAddCustomerType() {
    (this.$refs.add as any).onOpenDialog();
  }
}
</script>

<style scoped>
</style>
