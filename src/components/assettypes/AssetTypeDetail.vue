<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading asset type ..."
    :loaded="loaded"
    :record="assetType"
  >
    <template slot="header">
      <asset-type-detail-header
        v-if="assetType"
        :record="assetType"
        @assetTypeDeleted="onAssetTypeDeleted"
        @assetTypeUpdated="onAssetTypeUpdated"
      />
    </template>
    <template slot="tabs">
      <v-tab key="assets">Assets</v-tab>
    </template>
    <template slot="tab-items">
      <asset-type-assets tabkey="assets" ref="assets" :assetTypeToken="token" />
    </template>
    <template slot="dialogs">
      <asset-type-update-dialog ref="edit" :token="token" @assetTypeUpdated="onAssetTypeUpdated" />
      <asset-type-delete-dialog ref="delete" :token="token" @assetTypeDeleted="onAssetTypeDeleted" />
    </template>
    <template slot="actions">
      <edit-button tooltip="Edit Asset Type" @action="onEdit" />
      <delete-button tooltip="Delete Asset Type" @action="onDelete" />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, getAssetType } from "sitewhere-ide-common";
import { DetailComponent, DetailPage } from "sitewhere-ide-components";

import AssetTypeDetailHeader from "./AssetTypeDetailHeader.vue";
import AssetTypeAssets from "./AssetTypeAssets.vue";
import AssetTypeDeleteDialog from "./AssetTypeDeleteDialog.vue";
import AssetTypeUpdateDialog from "./AssetTypeUpdateDialog.vue";
import AssetListEntry from "../assets/AssetListEntry.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import { IAssetType, IAssetTypeResponseFormat } from "sitewhere-rest-api";
import { AssetTypesSection } from "../../libraries/constants";

@Component({
  components: {
    DetailPage,
    AssetTypeDetailHeader,
    AssetTypeAssets,
    AssetListEntry,
    AssetTypeDeleteDialog,
    AssetTypeUpdateDialog,
    EditButton,
    DeleteButton
  }
})
export default class AssetTypeDetail extends DetailComponent<IAssetType> {
  @Ref() readonly edit!: AssetTypeUpdateDialog;
  @Ref() readonly delete!: AssetTypeDeleteDialog;

  /** Record as asset type */
  get assetType(): IAssetType | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.AssetType;
  }

  /** Get page title */
  get title(): string {
    return this.assetType ? this.assetType.name : "";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IAssetType> {
    const format: IAssetTypeResponseFormat = {
      includeContainedAreaTypes: false
    };
    return getAssetType(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded() {
    this.$store.commit("currentSection", AssetTypesSection);
  }

  /** Called to open edit dialog */
  onEdit() {
    if (this.token) {
      this.edit.open(this.token);
    }
  }

  /** Called when asset type is updated */
  onAssetTypeUpdated() {
    this.refresh();
  }

  /** Open delete dialog */
  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  /** Called when asset type is deleted */
  onAssetTypeDeleted() {
    routeTo(this, "/assettypes");
  }
}
</script>
