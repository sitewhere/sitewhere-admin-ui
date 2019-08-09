<template>
  <sw-list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading areas ..."
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(area) in matches" :key="area.token">
        <area-list-entry :area="area" @open="onOpenArea" />
      </v-flex>
    </sw-list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>There are no areas of this type.</div>
      </no-results-panel>
    </template>
  </sw-list-tab>
</template>

<script lang="ts">
import { Component, Prop, ListComponent } from "sitewhere-ide-common";

import AreaListEntry from "../areas/AreaListEntry.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { AxiosPromise } from "axios";
import { routeTo } from "../common/Utils";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    AreaListEntry,
    NoResultsPanel
  }
})
export default class AreaTypeAreas extends ListComponent<
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly areaTypeToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IAreaSearchCriteria {
    let criteria: IAreaSearchCriteria = {};
    criteria.areaTypeToken = this.areaTypeToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAreaResponseFormat {
    let format: IAreaResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IAreaSearchCriteria,
    format: IAreaResponseFormat
  ): AxiosPromise<IAreaSearchResults> {
    return listAreas(this.$store, criteria, format);
  }

  /** Called to open an area */
  onOpenArea(area: IArea) {
    routeTo(this, "/areas/" + area.token);
  }
}
</script>
