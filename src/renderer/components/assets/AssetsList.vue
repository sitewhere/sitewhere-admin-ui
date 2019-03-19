<template>
  <list-page
    icon="car"
    title="Assets"
    loadingMessage="Loading assets ..."
    :loaded="loaded"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs6 v-for="(asset) in matches" :key="asset.token">
      <asset-list-entry :asset="asset" @assetOpened="onOpenAsset"></asset-list-entry>
    </v-flex>
    <template slot="dialogs">
      <asset-create-dialog ref="add" @assetAdded="refresh"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="plus" tooltip="Add Asset" @action="onAddAsset"></navigation-action-button>
    </template>
  </list-page>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListPage from "../common/ListPage.vue";
import AssetListEntry from "./AssetListEntry.vue";
import AssetCreateDialog from "./AssetCreateDialog.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";

import { Store } from "vuex";
import { IPageSizes } from "../../libraries/navigation-model";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listAssets } from "../../rest/sitewhere-assets-api";
import {
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
} from "sitewhere-rest-api";

export class AssetListComponent extends ListComponent<
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
> {}

@Component({
  components: {
    ListPage,
    AssetListEntry,
    AssetCreateDialog,
    NavigationActionButton
  }
})
export default class AssetsList extends Mixins(AssetListComponent) {
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

  /** Build search criteria for list */
  buildSearchCriteria(): IAssetSearchCriteria {
    let criteria: IAssetSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IAssetResponseFormat {
    let format: IAssetResponseFormat = {};
    format.includeAssetType = true;
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IAssetSearchCriteria,
    format: IAssetResponseFormat
  ): AxiosPromise<IAssetSearchResults> {
    return listAssets(store, criteria, format);
  }

  // Called on open.
  onOpenAsset(asset: IAsset) {
    routeTo(this, "/assets/" + asset.token);
  }

  // Called to open dialog.
  onAddAsset() {
    (this.$refs.add as any).onOpenDialog();
  }
}
</script>

<style scoped>
</style>
