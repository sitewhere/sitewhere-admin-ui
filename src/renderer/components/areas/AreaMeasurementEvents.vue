<template>
  <list-tab :key="key" :id="id" :loaded="loaded" @pagingUpdated="onPagingUpdated">
    <measurement-events-table :matches="matches" no-data-text="No Measurements Found for Area"/>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListTab from "../common/ListTab.vue";
import MeasurementEventsTable from "../common/MeasurementEventsTable.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { formatDate } from "../common/Utils";
import { listMeasurementsForArea } from "../../rest/sitewhere-areas-api";
import {
  IDeviceMeasurement,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults
} from "sitewhere-rest-api/dist/model/device-events-model";
import { IDateRangeSearchCriteria } from "sitewhere-rest-api/dist/model/common-model";
import { IPageSizes } from "../../libraries/navigation-model";

export class AreaMeasurementsListComponent extends ListComponent<
  IDeviceMeasurement,
  IDateRangeSearchCriteria,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults
> {}

@Component({
  components: {
    ListTab,
    MeasurementEventsTable
  }
})
export default class AreaMeasurementEvents extends Mixins(
  AreaMeasurementsListComponent
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
  buildResponseFormat(): IDeviceMeasurementResponseFormat {
    let format: IDeviceMeasurementResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IDateRangeSearchCriteria,
    format: IDeviceMeasurementResponseFormat
  ): AxiosPromise<IDeviceMeasurementSearchResults> {
    return listMeasurementsForArea(store, this.areaToken, criteria, format);
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>

<style scoped>
</style>
