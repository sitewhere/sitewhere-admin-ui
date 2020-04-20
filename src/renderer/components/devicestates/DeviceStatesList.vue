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
import {
  Component,
  Prop,
  searchDeviceStates,
  IPaging
} from "sitewhere-ide-common";
import {
  IDeviceStateSearchCriteria,
  IDeviceStateResponseFormat
} from "sitewhere-rest-api";

@Component({})
export default class DeviceStatesList extends Vue {
  results: any = null;
  paging: IPaging | null = null;
  deviceStates: any = null;
  loaded: boolean = false;

  /** Update paging values and run query */
  updatePaging(paging: IPaging) {
    this.$data.paging = paging;
    this.refresh();
  }

  /** Refresh list of sites */
  refresh() {
    this.$data.loaded = false;
    let paging = this.$data.paging;
    let component = this;

    let criteria: IDeviceStateSearchCriteria = {};
    criteria.pageNumber = paging.page;
    criteria.pageSize = paging.pageSize;

    let format: IDeviceStateResponseFormat = {};
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
      .catch(function(e) {
        component.loaded = true;
      });
  }
}
</script>

<style scoped>
</style>
