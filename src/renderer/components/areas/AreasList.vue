<template>
  <navigation-page icon="map" title="Areas" loadingMessage="Loading areas ..." :loaded="loaded">
    <div slot="content">
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="results">
        <v-layout row wrap>
          <v-flex xs6 v-for="(area) in matches" :key="area.token">
            <area-list-entry :area="area" @openArea="onOpenArea"></area-list-entry>
          </v-flex>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="onPagingUpdated"></pager>
      <area-create-dialog ref="add" @areaAdded="onAreaAdded"/>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Area" @action="onAddArea"></navigation-action-button>
    </div>
  </navigation-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";
import NavigationPage from "../common/NavigationPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import Pager from "../common/Pager.vue";
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
} from "sitewhere-rest-api/dist/model/areas-model";
import { IAreaTypeSearchCriteria } from "sitewhere-rest-api/dist/model/area-types-model";

export class AreaListComponent extends ListComponent<
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat,
  IAreaSearchResults
> {}

@Component({
  components: {
    NavigationPage,
    NavigationActionButton,
    Pager,
    AreaListEntry,
    AreaCreateDialog
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
    criteria: IAreaTypeSearchCriteria,
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
