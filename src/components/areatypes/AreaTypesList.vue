<template>
  <list-page
    :icon="icon"
    title="Area Types"
    loadingMessage="Loading area types ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="areaType in matches" :key="areaType.token">
        <area-type-list-entry :areaType="areaType" @open="onOpenAreaType" />
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No area types have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{ addIcon }}</v-icon>in the toolbar to add an area type.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <area-type-create-dialog ref="add" @areaTypeAdded="onAreaTypeAdded" :areaTypes="matches" />
    </template>
    <template slot="actions">
      <add-button icon="plus" tooltip="Add Area Type" @action="onAddAreaType" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, listAreaTypes } from "sitewhere-ide-common";
import { ListComponent } from "sitewhere-ide-components";

import { ListPage, ListLayout } from "sitewhere-ide-components";
import AreaTypeListEntry from "./AreaTypeListEntry.vue";
import AreaTypeCreateDialog from "./AreaTypeCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import {
  IAreaType,
  IAreaTypeSearchCriteria,
  IAreaTypeResponseFormat,
  IAreaTypeSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    AreaTypeListEntry,
    AreaTypeCreateDialog,
    AddButton,
    NoResultsPanel
  }
})
export default class AreaTypesList extends ListComponent<
  IAreaType,
  IAreaTypeSearchCriteria,
  IAreaTypeResponseFormat,
  IAreaTypeSearchResults
> {
  @Ref() readonly add!: AreaTypeCreateDialog;

  addIcon: string = NavigationIcon.Add;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.AreaType;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IAreaTypeSearchCriteria {
    const criteria: IAreaTypeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAreaTypeResponseFormat {
    const format: IAreaTypeResponseFormat = {};
    format.includeContainedAreaTypes = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IAreaTypeSearchCriteria,
    format: IAreaTypeResponseFormat
  ): AxiosPromise<IAreaTypeSearchResults> {
    return listAreaTypes(this.$store, criteria, format);
  }

  // Called when an area type is clicked.
  onOpenAreaType(areaType: IAreaType) {
    routeTo(this, "/areatypes/" + areaType.token);
  }

  // Called to open dialog.
  onAddAreaType() {
    this.add.open();
  }

  // Called when a new area type is added.
  onAreaTypeAdded() {
    this.refresh();
  }
}
</script>
