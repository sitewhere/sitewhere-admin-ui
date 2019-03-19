<template>
  <list-tab :key="key" :id="id" :loaded="loaded" @pagingUpdated="onPagingUpdated">
    <location-events-table :matches="matches" no-data-text="No Locations Found for Area"/>
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
import { listLocationsForArea } from "../../rest/sitewhere-areas-api";
import { IPageSizes } from "../../libraries/navigation-model";
import {
  IDeviceLocation,
  IDeviceLocationResponseFormat,
  IDeviceLocationSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

export class AreaLocationsListComponent extends ListComponent<
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
export default class AreaLocationEvents extends Mixins(
  AreaLocationsListComponent
) {
  @Prop() readonly key!: string;
  @Prop() readonly id!: string;
  @Prop() readonly areaToken!: string;

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
    return listLocationsForArea(store, this.areaToken, criteria, format);
  }
}
</script>

<style scoped>
</style>
