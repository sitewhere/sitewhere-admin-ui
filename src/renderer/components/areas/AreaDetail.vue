<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading area ..."
    :loaded="loaded"
    :record="area"
  >
    <template slot="header">
      <area-detail-header :record="area"/>
    </template>
    <template slot="tabs">
      <v-tab key="areas" href="#areas">Subareas</v-tab>
      <v-tab key="assignments" href="#assignments">Assigned Devices</v-tab>
      <v-tab key="locations" href="#locations">Locations</v-tab>
      <v-tab key="measurements" href="#measurements">Measurements</v-tab>
      <v-tab key="alerts" href="#alerts">Alerts</v-tab>
      <v-tab key="zones" href="#zones">Zones</v-tab>
    </template>
    <template slot="tab-items">
      <area-subareas tabkey="areas" id="areas" ref="subareas" :areaToken="token"/>
      <area-assignments tabkey="assignments" id="assignments" :areaToken="token"/>
      <area-location-events tabkey="locations" id="locations" :areaToken="token"/>
      <area-measurement-events tabkey="measurements" id="measurements" :areaToken="token"/>
      <area-alert-events tabkey="alerts" id="alerts" :areaToken="token"/>
      <area-zones ref="zones" tabkey="zones" id="zones" :areaToken="token"/>
    </template>
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
import { Component } from "vue-property-decorator";

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
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection } from "../../libraries/navigation-model";
import { getArea } from "../../rest/sitewhere-areas-api";
import { IArea, IAreaResponseFormat } from "sitewhere-rest-api";

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
export default class AreaDetail extends DetailComponent<IArea> {
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
      icon: NavigationIcon.Area,
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
