<template>
  <div>
    <navigation-page v-if="area" icon="map" :title="area.name"
      loadingMessage="Loading area ..." :loaded="loaded">
      <div v-if="parentArea" slot="actions">
        <v-tooltip left>
          <v-btn icon slot="activator" @click="onUpOneLevel">
            <font-awesome-icon icon="arrow-circle-up" size="lg"/>
          </v-btn>
          <span>Up One Level</span>
        </v-tooltip>
      </div>
      <div slot="content">
        <area-detail-header :area="area">
        </area-detail-header>
        <v-tabs v-model="active">
          <v-tabs-bar dark color="primary">
            <v-tabs-item key="contained" href="#contained">
              Contained Areas
            </v-tabs-item>
            <v-tabs-item key="assignments" href="#assignments">
              Device Assignments
            </v-tabs-item>
            <v-tabs-item key="locations" href="#locations">
              Locations
            </v-tabs-item>
            <v-tabs-item key="measurements" href="#measurements">
              Measurements
            </v-tabs-item>
            <v-tabs-item key="alerts" href="#alerts">
              Alerts
            </v-tabs-item>
            <v-tabs-item key="zones" href="#zones">
              Zones
            </v-tabs-item>
            <v-tabs-slider></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content key="contained" id="contained">
              <area-contained-areas :area="area"></area-contained-areas>
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
              <area-zones :area="area"></area-zones>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <zone-create-dialog v-if="active === 'zones'" :area="area" @zoneAdded="onZoneAdded"/>
      </div>
      <div slot="actions">
        <navigation-action-button icon="edit" tooltip="Edit Area"
          @action="onEdit">
        </navigation-action-button>
        <navigation-action-button icon="times" tooltip="Delete Area"
          @action="onDelete">
        </navigation-action-button>
      </div>
    </navigation-page>
    <area-update-dialog ref="edit" :token="token" :parentArea="parentArea"
      @areaUpdated="onAreaUpdated">
    </area-update-dialog>
    <area-delete-dialog ref="delete" :token="token"
      @areaDeleted="onAreaDeleted">
    </area-delete-dialog>
  </div>
</template>

<script>
import Utils from "../common/Utils";
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import AreaDetailHeader from "./AreaDetailHeader";
import AreaContainedAreas from "./AreaContainedAreas";
import AreaAssignments from "./AreaAssignments";
import AreaLocationEvents from "./AreaLocationEvents";
import AreaMeasurementEvents from "./AreaMeasurementEvents";
import AreaAlertEvents from "./AreaAlertEvents";
import AreaZones from "./AreaZones";
import AreaUpdateDialog from "./AreaUpdateDialog";
import AreaDeleteDialog from "./AreaDeleteDialog";
import ZoneCreateDialog from "./ZoneCreateDialog";

import { _getArea } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    token: null,
    parentArea: null,
    area: null,
    active: null,
    loaded: false
  }),

  components: {
    Utils,
    NavigationPage,
    NavigationActionButton,
    AreaDetailHeader,
    AreaContainedAreas,
    AreaAssignments,
    AreaLocationEvents,
    AreaMeasurementEvents,
    AreaAlertEvents,
    AreaZones,
    AreaDeleteDialog,
    AreaUpdateDialog,
    ZoneCreateDialog
  },

  // Called on initial create.
  created: function() {
    this.display(this.$route.params.token);
  },

  // Called when component is reused.
  beforeRouteUpdate(to, from, next) {
    this.display(to.params.token);
    next();
  },

  methods: {
    // Display area with the given token.
    display: function(token) {
      this.$data.token = token;
      this.refresh();
    },
    // Called to refresh area data.
    refresh: function() {
      this.$data.loaded = false;
      var token = this.$data.token;
      var component = this;

      // Load area information.
      _getArea(this.$store, token)
        .then(function(response) {
          component.loaded = true;
          component.onAreaLoaded(response.data);
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },
    // Called after ara data is loaded.
    onAreaLoaded: function(data) {
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
    },
    // Called to open area edit dialog.
    onEdit: function() {
      this.$refs["edit"].onOpenDialog();
    },
    // Called when area is updated.
    onAreaUpdated: function() {
      this.refresh();
    },
    onDelete: function() {
      this.$refs["delete"].showDeleteDialog();
    },
    // Called when area is deleted.
    onAreaDeleted: function() {
      Utils.routeTo(this, "/areas");
    },
    // Move up one level in the area hierarchy.
    onUpOneLevel: function() {
      Utils.routeTo(this, "/areas/" + this.parentArea.token);
    },
    // Called when a zone is added.
    onZoneAdded: function() {
      this.refresh();
    }
  }
};
</script>

<style scoped>
</style>
