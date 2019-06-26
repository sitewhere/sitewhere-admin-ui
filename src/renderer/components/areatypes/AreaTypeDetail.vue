<template>
  <sw-detail-page
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
      <v-tab key="areas">Areas of Type</v-tab>
    </template>
    <template slot="tab-items">
      <area-type-areas tabkey="areas" ref="areas" :areaTypeToken="token"/>
    </template>
    <template slot="dialogs">
      <area-type-update-dialog ref="edit" :token="token" @areaTypeUpdated="onAreaTypeUpdated"/>
      <area-type-delete-dialog ref="delete" :token="token" @areaTypeDeleted="onAreaTypeDeleted"/>
    </template>
    <template slot="actions">
      <edit-button tooltip="Edit Area Type" @action="onEdit"/>
      <delete-button tooltip="Delete Area Type" @action="onDelete"/>
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

import AreaTypeDetailHeader from "./AreaTypeDetailHeader.vue";
import AreaTypeAreas from "./AreaTypeAreas.vue";
import AreaTypeDeleteDialog from "./AreaTypeDeleteDialog.vue";
import AreaTypeUpdateDialog from "./AreaTypeUpdateDialog.vue";
import AreaListEntry from "../areas/AreaListEntry.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getAreaType } from "../../rest/sitewhere-area-types-api";
import { IAreaType, IAreaTypeResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    AreaTypeDetailHeader,
    AreaTypeAreas,
    AreaListEntry,
    AreaTypeDeleteDialog,
    AreaTypeUpdateDialog,
    EditButton,
    DeleteButton
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
  loadRecord(token: string): AxiosPromise<IAreaType> {
    let format: IAreaTypeResponseFormat = {
      includeContainedAreaTypes: false
    };
    return getAreaType(this.$store, token, format);
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
