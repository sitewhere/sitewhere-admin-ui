<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading area ..."
    :loaded="loaded"
    :record="area"
  >
    <template slot="header">
      <area-detail-header :record="area" />
    </template>
    <template slot="tabs">
      <v-tab key="areas">Subareas</v-tab>
      <v-tab key="assignments">Assigned Devices</v-tab>
      <v-tab key="locations">Locations</v-tab>
      <v-tab key="measurements">Measurements</v-tab>
      <v-tab key="alerts">Alerts</v-tab>
      <v-tab key="zones">Zones</v-tab>
    </template>
    <template slot="tab-items">
      <area-subareas tabkey="areas" ref="subareas" :areaToken="token" />
      <area-assignments tabkey="assignments" :areaToken="token" />
      <area-location-events tabkey="locations" :areaToken="token" />
      <area-measurement-events tabkey="measurements" :areaToken="token" />
      <area-alert-events tabkey="alerts" :areaToken="token" />
      <area-zones ref="zones" tabkey="zones" :area="area" />
    </template>
    <template slot="dialogs">
      <area-create-dialog ref="create" :parentArea="area" @created="onSubareaAdded" />
      <area-update-dialog ref="edit" :token="token" @areaUpdated="onAreaUpdated" />
      <area-delete-dialog ref="delete" :token="token" @deleted="afterAreaDeleted" />
      <zone-create-dialog ref="zoneCreate" :area="area" @zoneAdded="onZoneAdded" />
    </template>
    <template slot="actions">
      <up-button v-if="parentArea" tooltip="Up One Level" @action="onUpOneLevel" />
      <area-button tooltip="Add Subarea" @action="onAddSubarea" />
      <zone-button tooltip="Add Zone" @action="onAddZone" />
      <edit-button tooltip="Edit Area" @action="onEdit" />
      <delete-button tooltip="Delete Area" @action="onDelete" />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, getArea } from "sitewhere-ide-common";
import { DetailComponent, DetailPage } from "sitewhere-ide-components";

import AreaDetailHeader from "./AreaDetailHeader.vue";
import AreaSubareas from "./AreaSubareas.vue";
import AreaAssignments from "./AreaAssignments.vue";
import AreaLocationEvents from "./AreaLocationEvents.vue";
import AreaMeasurementEvents from "./AreaMeasurementEvents.vue";
import AreaAlertEvents from "./AreaAlertEvents.vue";
import AreaZones from "./AreaZones.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";
import AreaUpdateDialog from "./AreaUpdateDialog.vue";
import AreaDeleteDialog from "./AreaDeleteDialog.vue";
import ZoneCreateDialog from "./ZoneCreateDialog.vue";
import UpButton from "../common/navbuttons/UpButton.vue";
import AreaButton from "../common/navbuttons/AreaButton.vue";
import ZoneButton from "../common/navbuttons/ZoneButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import { IArea, IAreaResponseFormat } from "sitewhere-rest-api";
import { AreasSection } from "../../libraries/constants";

@Component({
  components: {
    DetailPage,
    AreaDetailHeader,
    AreaSubareas,
    AreaAssignments,
    AreaLocationEvents,
    AreaMeasurementEvents,
    AreaAlertEvents,
    AreaZones,
    AreaCreateDialog,
    AreaUpdateDialog,
    AreaDeleteDialog,
    ZoneCreateDialog,
    UpButton,
    AreaButton,
    ZoneButton,
    EditButton,
    DeleteButton,
  },
})
export default class AreaDetail extends DetailComponent<IArea> {
  @Ref() readonly create!: AreaCreateDialog;
  @Ref() readonly edit!: AreaUpdateDialog;
  @Ref() readonly delete!: AreaDeleteDialog;
  @Ref() readonly subareas!: AreaSubareas;
  @Ref() readonly zoneCreate!: ZoneCreateDialog;
  @Ref() readonly zones!: AreaZones;

  parentArea: IArea | null = null;

  /** Record as area */
  get area(): IArea | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Area;
  }

  /** Get page title */
  get title(): string {
    return this.area ? this.area.name : "";
  }

  /** Called when component is reused */
  beforeRouteUpdate(to: any, from: any, next: any) {
    this.display(to.params.token);
    next();
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IArea> {
    const format: IAreaResponseFormat = {
      includeAreaType: true,
    };
    return getArea(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded() {
    this.$store.commit("currentSection", AreasSection);
  }

  /** Called to open area edit dialog */
  onEdit() {
    if (this.token) {
      this.edit.open(this.token);
    }
  }

  /** Called to add a subarea */
  onAddSubarea() {
    this.create.open();
  }

  /** Called after subarea added */
  onSubareaAdded() {
    this.subareas.refresh();
  }

  /** Called to add a zone */
  onAddZone() {
    this.zoneCreate.open();
  }

  /** Called after zone added */
  onZoneAdded() {
    this.zones.refresh();
    this.refresh();
  }

  /** Called when area is updated */
  onAreaUpdated() {
    this.refresh();
  }

  /** Called to open the delete dialog */
  onDelete() {
    if (this.token) {
      this.delete.open(this.token);
    }
  }

  /** Called when area is deleted */
  afterAreaDeleted() {
    routeTo(this, "/areas");
  }

  /** Move up one level in the area hierarchy */
  onUpOneLevel() {
    if (this.parentArea) {
      routeTo(this, "/areas/" + this.parentArea.token);
    }
  }
}
</script>
