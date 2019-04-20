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
        <asset-list-entry :asset="asset"></asset-list-entry>
      </v-flex>
    </list-layout>
  </list-tab>
</template>

<script lang="ts">
import { Component, Prop, ListComponent } from "sitewhere-ide-common";

import ListTab from "../common/ListTab.vue";
import ListLayout from "../common/ListLayout.vue";
import AssetListEntry from "../assets/AssetListEntry.vue";

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
    ListTab,
    ListLayout,
    AssetListEntry
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
    let criteria: IAssetSearchCriteria = {};
    criteria.assetTypeToken = this.assetTypeToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAssetResponseFormat {
    let format: IAssetResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IAssetSearchCriteria,
    format: IAssetResponseFormat
  ): AxiosPromise<IAssetSearchResults> {
    return listAssets(this.$store, criteria, format);
  }
}
</script>

<style scoped>
</style>
