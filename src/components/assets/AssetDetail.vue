<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading asset ..."
    :loaded="loaded"
    :record="asset"
  >
    <template slot="header">
      <asset-detail-header :record="asset" />
    </template>
    <template slot="tabs">
      <v-tab key="assignments">Assignments</v-tab>
    </template>
    <template slot="tab-items">
      <asset-assignments tabkey="assignments" ref="assignments" :assetToken="token" />
    </template>
    <template slot="dialogs">
      <asset-update-dialog ref="edit" :token="token" @asseUpdated="onAssetUpdated" />
      <asset-delete-dialog ref="delete" :token="token" @assetDeleted="onAssetDeleted" />
    </template>
    <template slot="actions">
      <edit-button tooltip="Edit Asset" @action="onEdit" />
      <delete-button tooltip="Delete Asset" @action="onDelete" />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, getAsset } from "sitewhere-ide-common";
import { DetailComponent, DetailPage } from "sitewhere-ide-components";

import AssetDetailHeader from "./AssetDetailHeader.vue";
import AssetAssignments from "./AssetAssignments.vue";
import AssetDeleteDialog from "./AssetDeleteDialog.vue";
import AssetUpdateDialog from "./AssetUpdateDialog.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import {
  IAsset,
  IAssetResponseFormat,
  IDeviceAssignment
} from "sitewhere-rest-api";
import { AssetsSection } from "../../libraries/constants";

@Component({
  components: {
    DetailPage,
    AssetDetailHeader,
    AssetAssignments,
    AssetDeleteDialog,
    AssetUpdateDialog,
    EditButton,
    DeleteButton
  }
})
export default class AssetDetail extends DetailComponent<IAsset> {
  @Ref() readonly edit!: AssetUpdateDialog;
  @Ref() readonly delete!: AssetDeleteDialog;

  /** Record as asset */
  get asset(): IAsset | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Asset;
  }

  /** Get page title */
  get title(): string {
    return this.asset ? this.asset.name : "";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IAsset> {
    const format: IAssetResponseFormat = {
      includeAssetType: true
    };
    return getAsset(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded() {
    this.$store.commit("currentSection", AssetsSection);
  }

  /** Called to open edit dialog */
  onEdit() {
    if (this.token) {
      this.edit.open(this.token);
    }
  }

  /** Called when asset is updated */
  onAssetUpdated() {
    this.refresh();
  }

  /** Open delete dialog */
  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  /** Called when asset is deleted */
  onAssetDeleted() {
    routeTo(this, "/assets");
  }

  /** Called to open detail page for assignment */
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }
}
</script>
