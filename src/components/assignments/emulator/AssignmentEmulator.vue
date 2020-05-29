<template>
  <detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading assignment ..."
    :loaded="loaded"
    :record="assignment"
  >
    <template slot="header">
      <assignment-list-entry v-if="assignment" :assignment="assignment" headerMode="false" />
    </template>
    <template slot="tabs">
      <v-tab key="emulator">Emulator</v-tab>
    </template>
    <template slot="tab-items">
      <div style="position: relative; height: 100%;">
        <assignment-emulator-map
          ref="map"
          :assignment="assignment"
          :visible="loaded"
          @location="onLocationClicked"
        />
        <div :style="overlayStyle" v-if="addLocationMode">
          <span class="loc-overlay-text">Click Map to Add Location Event</span>
        </div>
      </div>
    </template>
    <template slot="dialogs">
      <location-create-dialog ref="location" :assignment="assignment" @created="onLocationAdded" />
      <alert-create-dialog ref="alert" :assignment="assignment" @created="onAlertAdded" />
      <measurement-create-dialog
        ref="measurement"
        :assignment="assignment"
        @created="onMeasurementAdded"
      />
    </template>
    <template slot="actions">
      <navigation-action-button
        icon="warning"
        :material="true"
        tooltip="Add Alert"
        @action="onAddAlertClicked"
      />
      <navigation-action-button
        icon="room"
        :material="true"
        tooltip="Add Location"
        @action="onEnterAddLocationMode"
      />
      <navigation-action-button
        icon="assessment"
        :material="true"
        tooltip="Add Measurement"
        @action="onAddMeasurementClicked"
      />
      <navigation-action-button
        icon="cached"
        :material="true"
        tooltip="Refresh Locations"
        @action="onRefreshLocations"
      />
    </template>
  </detail-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { NavigationIcon, getDeviceAssignment } from "sitewhere-ide-common";
import {
  DetailComponent,
  DetailPage,
  NavigationActionButton
} from "sitewhere-ide-components";

import AssignmentListEntry from "../AssignmentListEntry.vue";
import AssignmentEmulatorMap from "./AssignmentEmulatorMap.vue";

import LocationCreateDialog from "./LocationCreateDialog.vue";
import AlertCreateDialog from "./AlertCreateDialog.vue";
import MeasurementCreateDialog from "./MeasurementCreateDialog.vue";

import { AxiosPromise } from "axios";
import { Map as LeafletMap, LatLng } from "leaflet";
import {
  IDeviceAssignment,
  IDeviceAssignmentResponseFormat
} from "sitewhere-rest-api";
import { AssignmentEmulatorSection } from "../../../libraries/constants";

@Component({
  components: {
    DetailPage,
    NavigationActionButton,
    AssignmentListEntry,
    AssignmentEmulatorMap,
    LocationCreateDialog,
    AlertCreateDialog,
    MeasurementCreateDialog
  }
})
export default class AssignmentEmulator extends DetailComponent<
  IDeviceAssignment
> {
  @Ref() readonly map!: AssignmentEmulatorMap;
  @Ref() readonly location!: LocationCreateDialog;
  @Ref() readonly measurement!: MeasurementCreateDialog;
  @Ref() readonly alert!: AlertCreateDialog;

  addLocationMode = false;

  /** Access the Leaflet map directly */
  getMap(): LeafletMap | null {
    return this.map ? this.map.getMap() : null;
  }

  /** Record as assignment */
  get assignment(): IDeviceAssignment | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceAssignment;
  }

  /** Get page title */
  get title(): string {
    return (
      "Emulating " +
      (this.assignment ? this.assignment.token : " Device Assignment")
    );
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDeviceAssignment> {
    const format: IDeviceAssignmentResponseFormat = {
      includeDevice: true
    };
    return getDeviceAssignment(this.$store, token, format);
  }

  /** Called after data is loaded */
  afterRecordLoaded() {
    this.$store.commit("currentSection", AssignmentEmulatorSection);
  }

  /** Enter mode where next click adds a location */
  onEnterAddLocationMode() {
    this.addLocationMode = true;
    const component = this;
    const map = this.getMap();
    if (map) {
      map.on("click", function(e) {
        component.onMapClicked(e);
      });
    }
  }

  /** Exit mode where next click adds a location */
  onExitAddLocationMode() {
    this.addLocationMode = false;
    const map = this.getMap();
    if (map) {
      map.off("click");
    }
  }

  /** Called when a location is clicked */
  onLocationClicked(e: any) {
    const chosen: LatLng = e.latlng;
    const location: {} = {
      latitude: chosen.lat,
      longitude: chosen.lng,
      elevation: 0
    };
    this.location.loadAndOpen(location as any);
  }

  /** Called after a location has been added */
  onLocationAdded() {
    const component = this;
    setTimeout(function() {
      component.map.refreshLocations(false);
    }, 500);
  }

  /** Called to open alert create dialog */
  onAddAlertClicked() {
    this.alert.open();
  }

  /** Called after alert is added */
  onAlertAdded() {}

  /** Refresh location data */
  onRefreshLocations() {
    this.map.refreshLocations();
  }

  /** Called when map is clicked */
  onMapClicked(e: any) {
    this.onExitAddLocationMode();
    this.onLocationClicked(e);
  }

  /** Called when measurement add is clicked */
  onAddMeasurementClicked() {
    this.measurement.open();
  }

  /** Called after measurement is added */
  onMeasurementAdded() {}

  /** Style for overlay container */
  get overlayStyle() {
    return {
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      "background-color": "#fff",
      opacity: 0.65,
      padding: "10px 20px",
      "z-index": 500,
      "text-align": "center"
    };
  }
}
</script>

<style scoped>
.loc-overlay-text {
  font-size: 20px;
}
</style>
