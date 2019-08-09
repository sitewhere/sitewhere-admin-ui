<template>
  <sw-list-page
    :icon="icon"
    title="Assets"
    loadingMessage="Loading assets ..."
    :loaded="loaded"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(asset) in matches" :key="asset.token">
        <asset-list-entry :asset="asset" @assetOpened="onOpenAsset"></asset-list-entry>
      </v-flex>
    </sw-list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No assets have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{addIcon}}</v-icon>in the toolbar to add an asset.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <asset-create-dialog ref="add" @assetAdded="refresh" />
    </template>
    <template slot="actions">
      <sw-navigation-action-button icon="plus" tooltip="Add Asset" @action="onAddAsset" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import {
  Component,
  ListComponent,
  IPageSizes,
  Refs
} from "sitewhere-ide-common";

import AssetListEntry from "./AssetListEntry.vue";
import AssetCreateDialog from "./AssetCreateDialog.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { NavigationIcon } from "../../libraries/constants";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listAssets } from "../../rest/sitewhere-assets-api";
import {
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    AssetListEntry,
    AssetCreateDialog,
    NoResultsPanel
  }
})
export default class AssetsList extends ListComponent<
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
> {
  $refs!: Refs<{
    add: AssetCreateDialog;
  }>;

  addIcon: string = NavigationIcon.Add;

  pageSizes: IPageSizes = [
    {
      text: "20",
      value: 20
    },
    {
      text: "50",
      value: 50
    },
    {
      text: "100",
      value: 100
    }
  ];

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Asset;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IAssetSearchCriteria {
    let criteria: IAssetSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAssetResponseFormat {
    let format: IAssetResponseFormat = { includeAssetType: true };
    format.includeAssetType = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IAssetSearchCriteria,
    format: IAssetResponseFormat
  ): AxiosPromise<IAssetSearchResults> {
    return listAssets(this.$store, criteria, format);
  }

  // Called on open.
  onOpenAsset(asset: IAsset) {
    routeTo(this, "/assets/" + asset.token);
  }

  // Called to open dialog.
  onAddAsset() {
    this.$refs.add.open();
  }
}
</script>
