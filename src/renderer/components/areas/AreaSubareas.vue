<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <v-container class="pa-2" fluid grid-list-md fill-height>
      <v-layout row wrap>
        <v-flex xs6 v-for="(area) in matches" :key="area.token">
          <area-list-entry :area="area" @openArea="onOpenArea"/>
        </v-flex>
      </v-layout>
    </v-container>
    <template slot="dialogs">
      <area-create-dialog @areaAdded="refresh"/>
    </template>
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListTab from "../common/ListTab.vue";
import AreaListEntry from "./AreaListEntry.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
} from "sitewhere-rest-api";

export class AreaSubareasListComponent extends ListComponent<
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
> {}

@Component({
  components: {
    ListTab,
    AreaListEntry,
    AreaCreateDialog
  }
})
export default class AreaSubareas extends Mixins(AreaSubareasListComponent) {
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
    store: Store<SiteWhereUiSettings>,
    criteria: IAreaSearchCriteria,
    format: IAreaResponseFormat
  ): AxiosPromise<IAreaSearchResults> {
    return listAreas(store, criteria, format);
  }

  // Called to open an area.
  onOpenArea(area: IArea) {
    routeTo(this, "/areas/" + this.areaToken);
  }
}
</script>

<style scoped>
</style>
