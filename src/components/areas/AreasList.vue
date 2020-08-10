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
      <v-flex xs6 v-for="area in matches" :key="area.token">
        <area-list-entry :area="area" @open="onOpenArea" />
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No areas have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{ addIcon }}</v-icon>in the toolbar to add an area.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <area-create-dialog ref="add" @created="onAreaAdded" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Area" @action="onAddArea" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, listAreas, routeTo } from "sitewhere-ide-common";
import { ListComponent, ListPage, ListLayout } from "sitewhere-ide-components";

import AreaListEntry from "./AreaListEntry.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { AxiosPromise } from "axios";
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
    AddButton,
    NoResultsPanel
  }
})
export default class AreasList extends ListComponent<
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
> {
  @Ref() readonly add!: AreaCreateDialog;

  addIcon: string = NavigationIcon.Add;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Area;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IAreaSearchCriteria {
    const criteria: IAreaSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAreaResponseFormat {
    const format: IAreaResponseFormat = {};
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

  /** Called to open an area */
  onOpenArea(area: IArea) {
    routeTo(this, "/areas/" + area.token);
  }

  /** Called to open dialog */
  onAddArea() {
    this.add.open();
  }

  /** Called when a new area is added */
  onAreaAdded() {
    this.refresh();
  }
}
</script>
