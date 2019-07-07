<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading asset ..."
    :loaded="loaded"
    :record="asset"
  >
    <template slot="header">
      <asset-detail-header :record="asset"/>
    </template>
    <template slot="tabs">
      <v-tab key="assignments">Assignments</v-tab>
    </template>
    <template slot="tab-items">
      <asset-assignments tabkey="assignments" ref="assignments" :assetToken="token"/>
    </template>
    <template slot="dialogs">
      <asset-update-dialog ref="edit" :token="token" @asseUpdated="onAssetUpdated"/>
      <asset-delete-dialog ref="delete" :token="token" @assetDeleted="onAssetDeleted"/>
    </template>
    <template slot="actions">
      <sw-navigation-action-button icon="edit" tooltip="Edit Device" @action="onEdit"/>
      <sw-navigation-action-button icon="times" tooltip="Delete Device" @action="onDelete"/>
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  DialogComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import AssetDetailHeader from "./AssetDetailHeader.vue";
import AssetAssignments from "./AssetAssignments.vue";
import AssetDeleteDialog from "./AssetDeleteDialog.vue";
import AssetUpdateDialog from "./AssetUpdateDialog.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getAsset } from "../../rest/sitewhere-assets-api";
import {
  IAsset,
  IAssetResponseFormat,
  IDeviceAssignment
} from "sitewhere-rest-api";

@Component({
  components: {
    AssetDetailHeader,
    AssetAssignments,
    AssetDeleteDialog,
    AssetUpdateDialog
  }
})
export default class AssetDetail extends DetailComponent<IAsset> {
  // References.
  $refs!: Refs<{
    edit: AssetUpdateDialog;
    delete: DialogComponent<IAsset>;
  }>;

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
    let format: IAssetResponseFormat = {
      includeAssetType: true
    };
    return getAsset(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(asset: IAsset) {
    var section: INavigationSection = {
      id: "assets",
      title: "Assets",
      icon: NavigationIcon.Asset,
      route: "/admin/assets/" + asset.token,
      longTitle: "Manage Asset: " + asset.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called to open edit dialog.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called when asset is updated.
  onAssetUpdated() {
    this.refresh();
  }

  onDelete() {
    (this.$refs["delete"] as any).showDeleteDialog();
  }

  // Called when asset is deleted.
  onAssetDeleted() {
    routeTo(this, "/assets");
  }

  // Called to open detail page for assignment.
  onOpenAssignment(assignment: IDeviceAssignment) {
    routeTo(this, "/assignments/" + assignment.token);
  }
}
</script>
