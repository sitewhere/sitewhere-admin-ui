<template>
  <navigation-page icon="map" title="Areas" loadingMessage="Loading areas ..." :loaded="loaded">
    <div slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="areas">
        <v-layout row wrap>
          <v-flex xs6 v-for="(area) in areas" :key="area.token">
            <area-list-entry :area="area" @openArea="onOpenArea"></area-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="updatePaging"></pager>
      <area-create-dialog ref="add" @areaAdded="onAreaAdded"/>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Area" @action="onAddArea"></navigation-action-button>
    </div>
  </navigation-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import NavigationPage from "../common/NavigationPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import Pager from "../common/Pager.vue";
import AreaListEntry from "./AreaListEntry.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";

import { IPaging } from "../common/navigation-model";
import { handleError, routeTo } from "../common/Utils";
import { AxiosResponse } from "axios";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
} from "sitewhere-rest-api/dist/model/areas-model";

@Component({
  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    AreaListEntry,
    AreaCreateDialog
  }
})
export default class AreasList extends Vue {
  results: IAreaSearchResults | null = null;
  paging: IPaging | null = null;
  areas: IArea[] = [];
  loaded: boolean = false;

  // Update paging values and run query.
  updatePaging(paging: IPaging) {
    this.paging = paging;
    this.refresh();
  }

  // Refresh list of areas.
  async refresh() {
    let criteria: IAreaSearchCriteria = {};
    if (this.paging) {
      criteria.pageNumber = this.paging.pageNumber;
      criteria.pageSize = this.paging.pageSize;
    }

    let format: IAreaResponseFormat = {};
    format.includeAreaType = true;
    format.includeAssignments = false;
    format.includeZones = false;

    try {
      this.loaded = false;
      let response: AxiosResponse<IAreaSearchResults> = await listAreas(
        this.$store,
        criteria,
        format
      );
      this.results = response.data;
      this.areas = response.data.results;
    } catch (err) {
      handleError(err);
    }
    this.loaded = true;
  }

  // Called to open an area.
  onOpenArea(area: IArea) {
    routeTo(this, "/areas/" + area.token);
  }

  // Called to open dialog.
  onAddArea() {
    (this.$refs.add as any).onOpenDialog();
  }

  // Called when a new area is added.
  onAreaAdded() {
    this.refresh();
  }
}
</script>

<style scoped>
</style>
