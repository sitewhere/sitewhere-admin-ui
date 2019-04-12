<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading area type ..."
    :loaded="loaded"
    :record="areaType"
  >
    <template slot="header">
      <area-type-detail-header
        :record="areaType"
        @areaTypeDeleted="onAreaTypeDeleted"
        @areaTypeUpdated="onAreaTypeUpdated"
      />
    </template>
    <template slot="tabs">
      <v-tab key="areas" href="#areas">Areas of Type</v-tab>
    </template>
    <template slot="tab-items">
      <area-type-areas tabkey="areas" id="areas" ref="areas" :areaTypeToken="token"/>
    </template>
    <template slot="dialogs">
      <area-type-update-dialog ref="edit" :token="token" @areaTypeUpdated="onAreaTypeUpdated"/>
      <area-type-delete-dialog ref="delete" :token="token" @areaTypeDeleted="onAreaTypeDeleted"/>
    </template>
    <template slot="actions">
      <navigation-action-button icon="edit" tooltip="Edit Area Type" @action="onEdit"/>
      <navigation-action-button icon="times" tooltip="Delete Area Type" @action="onDelete"/>
    </template>
  </detail-page>
</template>

<script lang="ts">
import {
  DetailComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import DetailPage from "../common/DetailPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import AreaTypeDetailHeader from "./AreaTypeDetailHeader.vue";
import AreaTypeAreas from "./AreaTypeAreas.vue";
import AreaTypeDeleteDialog from "./AreaTypeDeleteDialog.vue";
import AreaTypeUpdateDialog from "./AreaTypeUpdateDialog.vue";
import AreaListEntry from "../areas/AreaListEntry.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection, Refs } from "../../libraries/navigation-model";
import { getAreaType } from "../../rest/sitewhere-area-types-api";
import { IAreaType, IAreaTypeResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    AreaTypeDetailHeader,
    AreaTypeAreas,
    AreaListEntry,
    AreaTypeDeleteDialog,
    AreaTypeUpdateDialog
  }
})
export default class AreaTypeDetail extends DetailComponent<IAreaType> {
  // References.
  $refs!: Refs<{
    edit: AreaTypeUpdateDialog;
    delete: DialogComponent<IAreaType>;
  }>;

  /** Record as area type */
  get areaType(): IAreaType | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.AreaType;
  }

  /** Get page title */
  get title(): string {
    return this.areaType ? this.areaType.name : "";
  }

  /** Load record */
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<IAreaType> {
    let format: IAreaTypeResponseFormat = {
      includeContainedAreaTypes: false
    };
    return getAreaType(store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(areaType: IAreaType) {
    var section: INavigationSection = {
      id: "areatypes",
      title: "Area Types",
      icon: NavigationIcon.AreaType,
      route: "/admin/areatypes/" + areaType.token,
      longTitle: "Manage Area Type: " + areaType.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called to open area type edit dialog.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called when area type is updated.
  onAreaTypeUpdated() {
    this.refresh();
  }

  onDelete() {
    (this.$refs["delete"] as any).showDeleteDialog();
  }

  // Called when area type is deleted.
  onAreaTypeDeleted() {
    routeTo(this, "/areatypes");
  }
}
</script>

<style scoped>
</style>
