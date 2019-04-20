<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="(area) in matches" :key="area.token">
        <area-list-entry :area="area" @openArea="onOpenArea"/>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <area-create-dialog @areaAdded="refresh"/>
    </template>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop, ListComponent } from "sitewhere-ide-common";

import ListTab from "../common/ListTab.vue";
import ListLayout from "../common/ListLayout.vue";
import AreaListEntry from "./AreaListEntry.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
} from "sitewhere-rest-api";

Component({
  components: {
    ListTab,
    ListLayout,
    AreaListEntry,
    AreaCreateDialog
  }
});
export default class AreaSubareas extends ListComponent<
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly areaToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IAreaSearchCriteria {
    let criteria: IAreaSearchCriteria = {};
    criteria.rootOnly = false;
    criteria.parentAreaToken = this.areaToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAreaResponseFormat {
    let format: IAreaResponseFormat = {};
    format.includeAreaType = true;
    format.includeAssignments = false;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IAreaSearchCriteria,
    format: IAreaResponseFormat
  ): AxiosPromise<IAreaSearchResults> {
    return listAreas(this.$store, criteria, format);
  }

  // Called to open an area.
  onOpenArea(area: IArea) {
    routeTo(this, "/areas/" + this.areaToken);
  }
}
</script>

<style scoped>
</style>
