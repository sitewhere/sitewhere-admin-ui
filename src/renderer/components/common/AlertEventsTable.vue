<template>
  <v-data-table :headers="headers" :items="matches" :hide-actions="true" :no-data-text="noDataText">
    <template slot="items" slot-scope="props">
      <td width="30%" :title="props.item.assetName">{{ props.item.assetName }}</td>
      <td width="20%" :title="props.item.type">{{ props.item.type }}</td>
      <td width="30%" :title="props.item.message">{{ props.item.message }}</td>
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
import { ITableHeaders } from "../../libraries/navigation-model";
import { Component, Prop } from "vue-property-decorator";

import Vue from "vue";

import { formatDate } from "../common/Utils";
import { IDeviceAlert } from "sitewhere-rest-api";

@Component({})
export default class AlertEventsTable extends Vue {
  @Prop() readonly noDataText!: string;
  @Prop() readonly matches!: IDeviceAlert[];

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
      text: "Type",
      value: "type"
    },
    {
      align: "left",
      sortable: false,
      text: "Message",
      value: "message"
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
}
</script>

<style scoped>
</style>
