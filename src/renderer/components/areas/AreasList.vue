<template>
  <list-page
    :icon="icon"
    title="Areas"
    loadingMessage="Loading areas ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="(area) in matches" :key="area.token">
        <area-list-entry :area="area" @openArea="onOpenArea"></area-list-entry>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <area-create-dialog ref="add" @areaAdded="onAreaAdded"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Area" @action="onAddArea"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import ListPage from "../common/ListPage.vue";
import ListLayout from "../common/ListLayout.vue";
import AreaListEntry from "./AreaListEntry.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { NavigationIcon } from "../../libraries/constants";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    AreaListEntry,
    AreaCreateDialog,
    NavigationActionButton
  }
})
export default class AreasList extends ListComponent<
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
> {
  $refs!: Refs<{
    add: AreaCreateDialog;
  }>;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Area;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IAreaSearchCriteria {
    let criteria: IAreaSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAreaResponseFormat {
    let format: IAreaResponseFormat = {};
    format.includeAreaType = true;
    format.includeAssignments = false;
    format.includeZones = false;
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
    routeTo(this, "/areas/" + area.token);
  }

  // Called to open dialog.
  onAddArea() {
    this.$refs.add.open();
  }

  // Called when a new area is added.
  onAreaAdded() {
    this.refresh();
  }
}
</script>

<style scoped>
</style>
