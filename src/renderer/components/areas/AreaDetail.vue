<template>
  <div>
    <navigation-page
      icon="map"
      :title="area.name"
      loadingMessage="Loading area ..."
      :loaded="loaded"
    >
      <div slot="content">
        <area-detail-header :area="area"></area-detail-header>
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
            <v-tabs-content key="areas" id="areas">
              <area-contained-areas ref="subareas" :area="area"></area-contained-areas>
            </v-tabs-content>
            <v-tabs-content key="assignments" id="assignments">
              <area-assignments :area="area"></area-assignments>
            </v-tabs-content>
            <v-tabs-content key="locations" id="locations">
              <area-location-events :area="area"></area-location-events>
            </v-tabs-content>
            <v-tabs-content key="measurements" id="measurements">
              <area-measurement-events :area="area"></area-measurement-events>
            </v-tabs-content>
            <v-tabs-content key="alerts" id="alerts">
              <area-alert-events :area="area"></area-alert-events>
            </v-tabs-content>
            <v-tabs-content key="zones" id="zones">
              <area-zones ref="zones" :area="area"></area-zones>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <area-create-dialog ref="areaCreate" :parentArea="area" @areaAdded="onSubareaAdded"/>
        <zone-create-dialog ref="zoneCreate" :area="area" @zoneAdded="onZoneAdded"/>
      </div>
      <div slot="actions">
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
      </div>
    </navigation-page>
    <area-update-dialog
      ref="edit"
      :token="token"
      :parentArea="parentArea"
      @areaUpdated="onAreaUpdated"
    ></area-update-dialog>
    <area-delete-dialog ref="delete" :token="token" @areaDeleted="onAreaDeleted"></area-delete-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import NavigationPage from "../common/NavigationPage.vue";
import NavigationActionButton from "../common/NavigationActionButton.vue";
import AreaDetailHeader from "./AreaDetailHeader.vue";
import AreaContainedAreas from "./AreaContainedAreas.vue";
import AreaAssignments from "./AreaAssignments.vue";
import AreaLocationEvents from "./AreaLocationEvents.vue";
import AreaMeasurementEvents from "./AreaMeasurementEvents.vue";
import AreaAlertEvents from "./AreaAlertEvents.vue";
import AreaZones from "./AreaZones.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";
import AreaUpdateDialog from "./AreaUpdateDialog.vue";
import AreaDeleteDialog from "./AreaDeleteDialog.vue";
import ZoneCreateDialog from "./ZoneCreateDialog.vue";
import { routeTo } from "../common/Utils";
import { getArea } from "../../rest/sitewhere-areas-api";
import { WithRoute } from "../common/navigation-model";
import { Route } from "vue-router/types/router";
import { IArea } from "sitewhere-rest-api/dist/model/areas-model";

@Component({
  name: "AreaDetail",
  components: {
    NavigationPage,
    NavigationActionButton,
    AreaDetailHeader,
    AreaContainedAreas,
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
export default class AreaDetail extends Vue implements WithRoute {
  token: string | null = null;
  parentArea: IArea | null = null;
  area: IArea | null = null;
  active: boolean = false;
  loaded: boolean = false;

  // Called on initial create.
  created() {
    this.display(this.$route.params.token);
  }

  // Called when component is reused.
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    this.display(to.params.token);
    next();
  }

  display(token: string) {
    this.$data.token = token;
    this.refresh();
  }

  // Called to refresh area data.
  refresh() {
    this.$data.loaded = false;
    var token = this.$data.token;
    var component = this;

    // Load area information.
    getArea(this.$store, token)
      .then(function(response) {
        component.loaded = true;
        component.onAreaLoaded(response.data);
      })
      .catch(function(e) {
        component.loaded = true;
      });
  }

  // Called after ara data is loaded.
  onAreaLoaded(data: any) {
    this.$data.parentArea = data.parentArea;
    this.$data.area = data;
    var section = {
      id: "areas",
      title: "Areas",
      icon: "map",
      route: "/admin/areas/" + data.token,
      longTitle: "Manage Area: " + data.name
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
