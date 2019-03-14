<template>
  <list-page
    icon="map"
    title="Areas"
    loadingMessage="Loading areas ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs6 v-for="(area) in matches" :key="area.token">
      <area-list-entry :area="area" @openArea="onOpenArea"></area-list-entry>
    </v-flex>
    <template slot="dialogs">
      <area-create-dialog ref="add" @areaAdded="onAreaAdded"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Area" @action="onAddArea"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import AreaListEntry from "./AreaListEntry.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

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
} from "sitewhere-rest-api/dist/model/areas-model";

export class AreaListComponent extends ListComponent<
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
> {}

@Component({
  components: {
    ListPage,
    AreaListEntry,
    AreaCreateDialog,
    NavigationActionButton
  }
})
export default class AreasList extends Mixins(AreaListComponent) {
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
    store: Store<SiteWhereUiSettings>,
    criteria: IAreaSearchCriteria,
    format: IAreaResponseFormat
  ): AxiosPromise<IAreaSearchResults> {
    return listAreas(store, criteria, format);
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
