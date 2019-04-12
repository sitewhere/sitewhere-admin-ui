<template>
  <list-page
    :icon="icon"
    title="Asset Types"
    loadingMessage="Loading asset types ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="(assetType) in matches" :key="assetType.token">
        <asset-type-list-entry
          :assetType="assetType"
          @assetTypeOpened="onOpenAssetType"
          @assetTypeDeleted="refresh"
        ></asset-type-list-entry>
      </v-flex>
    </list-layout>
    <template slot="dialogs">
      <asset-type-create-dialog ref="add" @assetTypeAdded="refresh"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Asset Type" @action="onAddAssetType"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import ListPage from "../common/ListPage.vue";
import ListLayout from "../common/ListLayout.vue";
import AssetTypeListEntry from "./AssetTypeListEntry.vue";
import AssetTypeCreateDialog from "./AssetTypeCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { NavigationIcon } from "../../libraries/constants";
import { Refs } from "../../libraries/navigation-model";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listAssetTypes } from "../../rest/sitewhere-asset-types-api";
import {
  IAssetType,
  IAssetTypeSearchCriteria,
  IAssetTypeResponseFormat,
  IAssetTypeSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    AssetTypeListEntry,
    AssetTypeCreateDialog,
    NavigationActionButton
  }
})
export default class AreasList extends ListComponent<
  IAssetType,
  IAssetTypeSearchCriteria,
  IAssetTypeResponseFormat,
  IAssetTypeSearchResults
> {
  $refs!: Refs<{
    add: AssetTypeCreateDialog;
  }>;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.AssetType;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IAssetTypeSearchCriteria {
    let criteria: IAssetTypeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAssetTypeResponseFormat {
    let format: IAssetTypeResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IAssetTypeSearchCriteria,
    format: IAssetTypeResponseFormat
  ): AxiosPromise<IAssetTypeSearchResults> {
    return listAssetTypes(store, criteria, format);
  }

  // Called on open.
  onOpenAssetType(assetType: IAssetType) {
    routeTo(this, "/assettypes/" + assetType.token);
  }

  // Called to open dialog.
  onAddAssetType() {
    this.$refs.add.open();
  }
}
</script>

<style scoped>
</style>
