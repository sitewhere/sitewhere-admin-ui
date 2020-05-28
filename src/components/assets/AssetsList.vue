<template>
  <list-page
    :icon="icon"
    title="Assets"
    loadingMessage="Loading assets ..."
    :loaded="loaded"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <list-layout>
      <v-flex xs6 v-for="asset in matches" :key="asset.token">
        <asset-list-entry :asset="asset" @assetOpened="onOpenAsset"></asset-list-entry>
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No assets have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{ addIcon }}</v-icon>in the toolbar to add an asset.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <asset-create-dialog ref="add" @assetAdded="refresh" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Asset" @action="onAddAsset" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { IPageSizes, NavigationIcon, listAssets } from "sitewhere-ide-common";
import { ListComponent, ListPage, ListLayout } from "sitewhere-ide-components";

import AssetListEntry from "./AssetListEntry.vue";
import AssetCreateDialog from "./AssetCreateDialog.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";
import AddButton from "../common/navbuttons/AddButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import {
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    ListLayout,
    AssetListEntry,
    AssetCreateDialog,
    NoResultsPanel,
    AddButton
  }
})
export default class AssetsList extends ListComponent<
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
> {
  @Ref() readonly add!: AssetCreateDialog;

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
    const criteria: IAssetSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAssetResponseFormat {
    const format: IAssetResponseFormat = { includeAssetType: true };
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
    this.add.open();
  }
}
</script>
