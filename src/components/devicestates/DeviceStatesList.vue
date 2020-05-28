<template>
  <sw-navigation-page
    icon="fa-microchip"
    title="Manage Device States"
    loadingMessage="Loading device states ..."
    :loaded="loaded"
  >
    <div slot="actions"></div>
    <div slot="content">
      <v-card>
        <v-card-text>Device States</v-card-text>
      </v-card>
      <sw-pager :results="results" @pagingUpdated="updatePaging" />
    </div>
  </sw-navigation-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { searchDeviceStates, IPaging } from "sitewhere-ide-common";
import {
  IDeviceStateSearchCriteria,
  IDeviceStateResponseFormat
} from "sitewhere-rest-api";

@Component({})
export default class DeviceStatesList extends Vue {
  results: any = null;
  paging: IPaging | null = null;
  deviceStates: any = null;
  loaded = false;

  /** Update paging values and run query */
  updatePaging(paging: IPaging) {
    this.$data.paging = paging;
    this.refresh();
  }

  /** Refresh list of sites */
  refresh() {
    this.$data.loaded = false;
    const paging = this.$data.paging;
    const component = this;

    const criteria: IDeviceStateSearchCriteria = {};
    criteria.pageNumber = paging.page;
    criteria.pageSize = paging.pageSize;

    const format: IDeviceStateResponseFormat = {};
    format.includeDevice = true;
    format.includeDeviceType = true;
    format.includeCustomer = true;
    format.includeArea = true;
    format.includeAsset = true;
    format.includeEventDetails = true;

    searchDeviceStates(this.$store, criteria, format)
      .then(function(response) {
        component.loaded = true;
        component.results = response.data;
        component.deviceStates = response.data.results;
      })
      .catch(function() {
        component.loaded = true;
      });
  }
}
</script>

