<template>
  <list-page
    icon="cog"
    title="Area Types"
    loadingMessage="Loading area types ..."
    :loaded="loaded"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs6 v-for="(areaType) in matches" :key="areaType.token">
      <area-type-list-entry
        :areaType="areaType"
        @areaTypeOpened="onOpenAreaType"
        @areaTypeDeleted="refresh"
      ></area-type-list-entry>
    </v-flex>
    <template slot="dialogs">
      <area-type-create-dialog ref="add" @areaTypeAdded="onAreaTypeAdded" :areaTypes="areaTypes"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Area Type" @action="onAddAreaType"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import AreaTypeListEntry from "./AreaTypeListEntry.vue";
import AreaTypeCreateDialog from "./AreaTypeCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listAreaTypes } from "../../rest/sitewhere-area-types-api";
import {
  IAreaType,
  IAreaTypeSearchCriteria,
  IAreaTypeResponseFormat,
  IAreaTypeSearchResults
} from "sitewhere-rest-api/dist/model/area-types-model";

export class AreaListComponent extends ListComponent<
  IAreaType,
  IAreaTypeSearchCriteria,
  IAreaTypeResponseFormat,
  IAreaTypeSearchResults
> {}

@Component({
  components: {
    ListPage,
    AreaTypeListEntry,
    AreaTypeCreateDialog,
    NavigationActionButton
  }
})
export default class AreasList extends Mixins(AreaListComponent) {
  /** Build search criteria for list */
  buildSearchCriteria(): IAreaTypeSearchCriteria {
    let criteria: IAreaTypeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAreaTypeResponseFormat {
    let format: IAreaTypeResponseFormat = {};
    format.includeContainedAreaTypes = true;
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IAreaTypeSearchCriteria,
    format: IAreaTypeResponseFormat
  ): AxiosPromise<IAreaTypeSearchResults> {
    return listAreaTypes(store, criteria, format);
  }

  // Called when an area type is clicked.
  onOpenAreaType(token: string) {
    var tenant = this.$store.getters.selectedTenant;
    if (tenant) {
      this.$router.push("/tenants/" + tenant.id + "/areatypes/" + token);
    }
  }

  // Called to open dialog.
  onAddAreaType() {
    (this.$refs.add as any).onOpenDialog();
  }

  // Called when a new area type is added.
  onAreaTypeAdded() {
    this.refresh();
  }
}
</script>


<style scoped>
</style>
