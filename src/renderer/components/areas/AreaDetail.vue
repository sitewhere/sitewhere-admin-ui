<template>
  <detail-page
    icon="map"
    :title="title"
    loadingMessage="Loading area ..."
    :loaded="loaded"
    :record="area"
  >
    <template slot="header">
      <area-detail-header :record="area"/>
    </template>
    <v-tabs v-model="active">
      <v-tabs-bar dark color="primary">
        <v-tabs-item key="areas" href="#areas">Subareas</v-tabs-item>
        <v-tabs-item key="assignments" href="#assignments">Assigned Devices</v-tabs-item>
        <v-tabs-item key="locations" href="#locations">Locations</v-tabs-item>
        <v-tabs-item key="measurements" href="#measurements">Measurements</v-tabs-item>
        <v-tabs-item key="alerts" href="#alerts">Alerts</v-tabs-item>
        <v-tabs-item key="zones" href="#zones">Zones</v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <area-subareas key="areas" id="areas" ref="subareas" :areaToken="token"/>
        <area-assignments key="assignments" id="assignments" :areaToken="token"/>
        <area-location-events key="locations" id="locations" :areaToken="token"/>
        <area-measurement-events key="measurements" id="measurements" :areaToken="token"/>
        <area-alert-events key="alerts" id="alerts" :areaToken="token"/>
        <area-zones ref="zones" key="zones" id="zones" :areaToken="token"/>
      </v-tabs-items>
    </v-tabs>
    <template slot="dialogs">
      <area-create-dialog ref="areaCreate" :parentArea="area" @areaAdded="onSubareaAdded"/>
      <area-update-dialog
        ref="edit"
        :token="token"
        :parentArea="parentArea"
        @areaUpdated="onAreaUpdated"
      ></area-update-dialog>
      <area-delete-dialog ref="delete" :token="token" @areaDeleted="onAreaDeleted"></area-delete-dialog>
      <zone-create-dialog ref="zoneCreate" :area="area" @zoneAdded="onZoneAdded"/>
    </template>
    <template slot="actions">
      <navigation-action-button
        v-if="parentArea"
        icon="arrow-circle-up"
        tooltip="Up One Level"
        @action="onUpOneLevel"
      ></navigation-action-button>
      <navigation-action-button icon="map" tooltip="Add Subarea" @action="onAddSubarea"></navigation-action-button>
      <navigation-action-button icon="draw-polygon" tooltip="Add Zone" @action="onAddZone"></navigation-action-button>
      <navigation-action-button icon="edit" tooltip="Edit Area" @action="onEdit"></navigation-action-button>
      <navigation-action-button icon="times" tooltip="Delete Area" @action="onDelete"></navigation-action-button>
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

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { INavigationSection } from "../../libraries/navigation-model";
import { getArea } from "../../rest/sitewhere-areas-api";
import { IArea, IAreaResponseFormat } from "sitewhere-rest-api";

export class AreaDetailComponent extends DetailComponent<IArea> {}

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
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
    ZoneCreateDialog
  }
})
export default class AreaDetail extends Mixins(AreaDetailComponent) {
  active: string | null = null;
  parentArea: IArea | null = null;

  get area(): IArea | null {
    return this.record;
  }

  get title(): string {
    return this.area ? this.area.name : "";
  }

  get token(): string | null {
    return this.area ? this.area.token : null;
  }

  /** Load record */
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<IArea> {
    let format: IAreaResponseFormat = {
      includeAreaType: true
    };
    return getArea(store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(area: IArea) {
    this.parentArea = (area as any).parentArea;
    var section: INavigationSection = {
      id: "areas",
      title: "Areas",
      icon: "map",
      route: "/admin/areas/" + area.token,
      longTitle: "Manage Area: " + area.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called to open area edit dialog.
  onEdit() {
    (this.$refs["edit"] as any).onOpenDialog();
  }

  // Called to add a subarea.
  onAddSubarea() {
    (this.$refs["areaCreate"] as any).onOpenDialog();
  }
  // Called after subarea added.
  onSubareaAdded() {
    this.$data.active = "areas";
    (this.$refs["subareas"] as any).refresh();
  }

  // Called to add a zone.
  onAddZone() {
    (this.$refs["zoneCreate"] as any).onOpenDialog();
  }

  // Called after zone added.
  onZoneAdded() {
    this.$data.active = "zones";
    (this.$refs["zones"] as any).refresh();
    this.refresh();
  }

  // Called when area is updated.
  onAreaUpdated() {
    this.refresh();
  }

  onDelete() {
    (this.$refs["delete"] as any).showDeleteDialog();
  }

  // Called when area is deleted.
  onAreaDeleted() {
    routeTo(this, "/areas");
  }

  // Move up one level in the area hierarchy.
  onUpOneLevel() {
    if (this.parentArea) {
      routeTo(this, "/areas/" + this.parentArea.token);
    }
  }
}
</script>

<style scoped>
</style>
