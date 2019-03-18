<template>
  <list-tab :key="key" :id="id" :loaded="loaded" @pagingUpdated="onPagingUpdated">
    <v-data-table
      :headers="headers"
      :items="matches"
      :hide-actions="true"
      no-data-text="No Measurements Found for Customer"
    >
      <template slot="items" slot-scope="props">
        <td width="30%" :title="props.item.assetName">{{ props.item.assetName }}</td>
        <td width="25%" :title="props.item.name">{{ props.item.name }}</td>
        <td width="25%" :title="props.item.value">{{ props.item.value }}</td>
        <td
          width="10%"
          style="white-space: nowrap"
          :title="formatDate(props.item.eventDate)"
        >{{ formatDate(props.item.eventDate) }}</td>
        <td
          width="10%"
          style="white-space: nowrap"
          :title="formatDate(props.item.receivedDate)"
        >{{ formatDate(props.item.receivedDate) }}</td>
      </template>
    </v-data-table>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent, ITableHeaders } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListTab from "../common/ListTab.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { formatDate } from "../common/Utils";
import { listMeasurementsForCustomer } from "../../rest/sitewhere-customers-api";
import {
  IDeviceMeasurement,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults
} from "sitewhere-rest-api/dist/model/device-events-model";
import { IDateRangeSearchCriteria } from "sitewhere-rest-api/dist/model/common-model";
import { IPageSizes } from "../../libraries/navigation-model";

export class CustomerMeasurementsListComponent extends ListComponent<
  IDeviceMeasurement,
  IDateRangeSearchCriteria,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults
> {}

@Component({
  components: {
    ListTab
  }
})
export default class CustomerMeasurementEvents extends Mixins(
  CustomerMeasurementsListComponent
) {
  @Prop() readonly key!: string;
  @Prop() readonly id!: string;
  @Prop() readonly customerToken!: string;

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Asset",
      value: "asset"
    },
    {
      align: "left",
      sortable: false,
      text: "Measurement Name",
      value: "mxname"
    },
    {
      align: "left",
      sortable: false,
      text: "Measurement Value",
      value: "mxvalue"
    },
    {
      align: "left",
      sortable: false,
      text: "Event Date",
      value: "event"
    },
    {
      align: "left",
      sortable: false,
      text: "Received Date",
      value: "received"
    }
  ];
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
    return listMeasurementsForCustomer(
      store,
      this.customerToken,
      criteria,
      format
    );
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>

<style scoped>
</style>
