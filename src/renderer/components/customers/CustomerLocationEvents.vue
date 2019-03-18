<template>
  <list-tab :key="key" :id="id" :loaded="loaded" @pagingUpdated="onPagingUpdated">
    <location-events-table :matches="matches" no-data-text="No Locations Found for Customer"/>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListTab from "../common/ListTab.vue";
import LocationEventsTable from "../common/LocationEventsTable.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listLocationsForCustomer } from "../../rest/sitewhere-customers-api";
import {
  IDeviceLocation,
  IDeviceLocationResponseFormat,
  IDeviceLocationSearchResults
} from "sitewhere-rest-api/dist/model/device-events-model";
import { IDateRangeSearchCriteria } from "sitewhere-rest-api/dist/model/common-model";
import { IPageSizes } from "../../libraries/navigation-model";

export class CustomerLocationsListComponent extends ListComponent<
  IDeviceLocation,
  IDateRangeSearchCriteria,
  IDeviceLocationResponseFormat,
  IDeviceLocationSearchResults
> {}

@Component({
  components: {
    ListTab,
    LocationEventsTable
  }
})
export default class CustomerLocationEvents extends Mixins(
  CustomerLocationsListComponent
) {
  @Prop() readonly key!: string;
  @Prop() readonly id!: string;
  @Prop() readonly customerToken!: string;

  pageSizes: IPageSizes = [
    {
      text: "25",
      value: 25
    },
    {
      text: "50",
      value: 50
    },
    {
      text: "100",
      value: 100
    }
  ];

  /** Build search criteria for list */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    let criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceLocationResponseFormat {
    let format: IDeviceLocationResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDateRangeSearchCriteria,
    format: IDeviceLocationResponseFormat
  ): AxiosPromise<IDeviceLocationSearchResults> {
    return listLocationsForCustomer(
      store,
      this.customerToken,
      criteria,
      format
    );
  }
}
</script>

<style scoped>
</style>
