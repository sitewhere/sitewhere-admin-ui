<template>
  <v-data-table :headers="headers" :items="matches" :hide-actions="true" :no-data-text="noDataText">
    <template slot="items" slot-scope="props">
      <td width="40%" :title="props.item.assetName">{{ props.item.assetName }}</td>
      <td
        width="40%"
        title="Lat/Lon/Elevation"
      >{{ fourDecimalPlaces(props.item.latitude) + ', ' + fourDecimalPlaces(props.item.longitude) + ', ' + fourDecimalPlaces(props.item.elevation) }}</td>
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
</template>

<script lang="ts">
import { ITableHeaders } from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";

import Vue from "vue";

import { formatDate, fourDecimalPlaces } from "../common/Utils";
import { IDeviceLocation } from "sitewhere-rest-api";

@Component({})
export default class LocationEventsTable extends Vue {
  @Prop() readonly noDataText!: string;
  @Prop() readonly matches!: IDeviceLocation[];

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
      text: "Latitude/Longitude/Elevation",
      value: "lle"
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

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }

  /** Make function available to template */
  fourDecimalPlaces(value: number) {
    return fourDecimalPlaces(value);
  }
}
</script>

<style scoped>
</style>
