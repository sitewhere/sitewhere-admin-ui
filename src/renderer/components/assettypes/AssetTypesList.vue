<template>
  <sw-list-page
    :icon="icon"
    title="Asset Types"
    loadingMessage="Loading asset types ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(assetType) in matches" :key="assetType.token">
        <asset-type-list-entry
          :assetType="assetType"
          @assetTypeOpened="onOpenAssetType"
          @assetTypeDeleted="refresh"
        ></asset-type-list-entry>
      </v-flex>
    </sw-list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>No asset types have been created for this tenant.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{addIcon}}</v-icon>in the toolbar to add an asset type.
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <asset-type-create-dialog ref="add" @assetTypeAdded="refresh" />
    </template>
    <template slot="actions">
      <add-button tooltip="Add Asset Type" @action="onAddAssetType" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import AssetTypeListEntry from "./AssetTypeListEntry.vue";
import AssetTypeCreateDialog from "./AssetTypeCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { NavigationIcon } from "../../libraries/constants";
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
    AssetTypeListEntry,
    AssetTypeCreateDialog,
    AddButton,
    NoResultsPanel
  }
})
export default class AssetTypesList extends ListComponent<
  IAssetType,
  IAssetTypeSearchCriteria,
  IAssetTypeResponseFormat,
  IAssetTypeSearchResults
> {
  $refs!: Refs<{
    add: AssetTypeCreateDialog;
  }>;

  addIcon: string = NavigationIcon.Add;

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
    criteria: IAssetTypeSearchCriteria,
    format: IAssetTypeResponseFormat
  ): AxiosPromise<IAssetTypeSearchResults> {
    return listAssetTypes(this.$store, criteria, format);
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
