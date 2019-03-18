<template>
  <list-tab :key="key" :id="id" :loaded="loaded" @pagingUpdated="onPagingUpdated">
    <alert-events-table :matches="matches" no-data-text="No Alerts Found for Area"/>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListTab from "../common/ListTab.vue";
import AlertEventsTable from "../common/AlertEventsTable.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listAlertsForArea } from "../../rest/sitewhere-areas-api";
import {
  IDeviceAlert,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults
} from "sitewhere-rest-api/dist/model/device-events-model";
import { IDateRangeSearchCriteria } from "sitewhere-rest-api/dist/model/common-model";
import { IPageSizes } from "../../libraries/navigation-model";

export class CustomerMeasurementsListComponent extends ListComponent<
  IDeviceAlert,
  IDateRangeSearchCriteria,
  IDeviceAlertResponseFormat,
  IDeviceAlertSearchResults
> {}

@Component({
  components: {
    ListTab,
    AlertEventsTable
  }
})
export default class CustomerMeasurementEvents extends Mixins(
  CustomerMeasurementsListComponent
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
  buildResponseFormat(): IDeviceAlertResponseFormat {
    let format: IDeviceAlertResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDateRangeSearchCriteria,
    format: IDeviceAlertResponseFormat
  ): AxiosPromise<IDeviceAlertSearchResults> {
    return listAlertsForArea(store, this.areaToken, criteria, format);
  }
}
</script>

<style scoped>
</style>
