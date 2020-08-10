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
      <v-tab key="areas">Areas of Type</v-tab>
    </template>
    <template slot="tab-items">
      <area-type-areas tabkey="areas" ref="areas" :areaTypeToken="token" />
    </template>
    <template slot="dialogs">
      <area-type-update-dialog ref="edit" :token="token" @areaTypeUpdated="onAreaTypeUpdated" />
      <area-type-delete-dialog ref="delete" :token="token" @areaTypeDeleted="onAreaTypeDeleted" />
    </template>
    <template slot="actions">
      <edit-button tooltip="Edit Area Type" @action="onEdit" />
      <delete-button tooltip="Delete Area Type" @action="onDelete" />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, getAreaType } from "sitewhere-ide-common";
import { DetailComponent, DetailPage } from "sitewhere-ide-components";

import AreaTypeDetailHeader from "./AreaTypeDetailHeader.vue";
import AreaTypeAreas from "./AreaTypeAreas.vue";
import AreaTypeDeleteDialog from "./AreaTypeDeleteDialog.vue";
import AreaTypeUpdateDialog from "./AreaTypeUpdateDialog.vue";
import AreaListEntry from "../areas/AreaListEntry.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import { IAreaType, IAreaTypeResponseFormat } from "sitewhere-rest-api";
import { AreaTypesSection } from "../../libraries/constants";

@Component({
  components: {
    DetailPage,
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
  @Ref() readonly edit!: AreaTypeUpdateDialog;
  @Ref() readonly delete!: AreaTypeDeleteDialog;

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
    const format: IAreaTypeResponseFormat = {
      includeContainedAreaTypes: false
    };
    return getAreaType(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded() {
    this.$store.commit("currentSection", AreaTypesSection);
  }

  /** Called to open area type edit dialog */
  onEdit() {
    if (this.token) {
      this.edit.open(this.token);
    }
  }

  /** Called when area type is updated */
  onAreaTypeUpdated() {
    this.refresh();
  }

  /** Called to open delete dialog */
  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  /** Called when area type is deleted */
  onAreaTypeDeleted() {
    routeTo(this, "/areatypes");
  }
}
</script>
