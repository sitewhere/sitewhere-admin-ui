<template>
  <list-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading assets ..."
  >
    <list-layout>
      <v-flex xs6 v-for="(asset) in matches" :key="asset.token">
        <asset-list-entry :asset="asset" @assetOpened="onOpenAsset"/>
      </v-flex>
    </list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>There are no assets of this type.</div>
      </no-results-panel>
    </template>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { listAssets, routeTo } from "sitewhere-ide-common";
import { ListComponent, ListTab, ListLayout } from "sitewhere-ide-components";

import AssetListEntry from "../assets/AssetListEntry.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { AxiosPromise } from "axios";
import {
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListTab,
    ListLayout,
    AssetListEntry,
    NoResultsPanel
  }
})
export default class AssetTypeAssets extends ListComponent<
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly assetTypeToken!: string;

  /** Build search criteria for list */
  buildSearchCriteria(): IAssetSearchCriteria {
    const criteria: IAssetSearchCriteria = {};
    criteria.assetTypeToken = this.assetTypeToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAssetResponseFormat {
    const format: IAssetResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IAssetSearchCriteria,
    format: IAssetResponseFormat
  ): AxiosPromise<IAssetSearchResults> {
    return listAssets(this.$store, criteria, format);
  }

  /** Called to open an asset */
  onOpenAsset(asset: IAsset) {
    routeTo(this, "/assets/" + asset.token);
  }
}
</script>
