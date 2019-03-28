<template>
  <detail-page
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
      <v-tab key="assignments" href="#assignments">Assignments</v-tab>
    </template>
    <template slot="tab-items">
      <asset-assignments
        tabkey="assignments"
        id="assignments"
        ref="assignments"
        :assetToken="token"
      />
    </template>
    <template slot="dialogs">
      <asset-update-dialog ref="edit" :token="token" @asseUpdated="onAssetUpdated"/>
      <asset-delete-dialog ref="delete" :token="token" @assetDeleted="onAssetDeleted"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="edit" tooltip="Edit Device" @action="onEdit"/>
      <navigation-action-button icon="times" tooltip="Delete Device" @action="onDelete"/>
    </template>
  </detail-page>
</template>

<script lang="ts">
import { DetailComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import DetailPage from "../common/DetailPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import AssetDetailHeader from "./AssetDetailHeader.vue";
import AssetAssignments from "./AssetAssignments.vue";
import AssetDeleteDialog from "./AssetDeleteDialog.vue";
import AssetUpdateDialog from "./AssetUpdateDialog.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection } from "../../libraries/navigation-model";
import { getAsset } from "../../rest/sitewhere-assets-api";
import {
  IAsset,
  IAssetResponseFormat,
  IDeviceAssignment
} from "sitewhere-rest-api";

export class AreaDetailComponent extends DetailComponent<IAsset> {}

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    AssetDetailHeader,
    AssetAssignments,
    AssetDeleteDialog,
    AssetUpdateDialog
  }
})
export default class AreaDetail extends Mixins(AreaDetailComponent) {
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
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<IAsset> {
    let format: IAssetResponseFormat = {
      includeAssetType: true
    };
    return getAsset(store, token, format);
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
    (this.$refs["edit"] as any).onOpenDialog();
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

<style scoped>
</style>
