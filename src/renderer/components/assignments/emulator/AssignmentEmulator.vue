<template>
  <sw-detail-page
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
      <alert-create-dialog ref="alert" :assignment="assignment" @created="onAlertAdded" />
      <!--
      <location-create-dialog ref="locationCreate" :token="token" @locationAdded="onLocationAdded"></location-create-dialog>
      <measurements-create-dialog
        ref="mxCreate"
        :token="token"
        @locationAdded="onMeasurementsAdded"
      ></measurements-create-dialog>
      -->
    </template>
    <template slot="actions">
      <sw-navigation-action-button
        icon="exclamation-triangle"
        tooltip="Add Alert"
        @action="onAddAlertClicked"
      />
      <sw-navigation-action-button
        icon="crosshairs"
        tooltip="Add Location"
        @action="onEnterAddLocationMode"
      />
      <sw-navigation-action-button
        icon="crosshairs"
        tooltip="Pan to Last Location"
        @action="onPanToLastLocation"
      />
      <sw-navigation-action-button
        icon="thermometer-full"
        tooltip="Add Measurements"
        @action="onAddMeasurementsClicked"
      />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import AssignmentListEntry from "../AssignmentListEntry.vue";
import AssignmentEmulatorMap from "./AssignmentEmulatorMap.vue";

import AlertCreateDialog from "./AlertCreateDialog.vue";
// import LocationCreateDialog from "./LocationCreateDialog.vue";
// import MeasurementsCreateDialog from "./MeasurementsCreateDialog.vue";

import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../../libraries/constants";
import { getDeviceAssignment } from "../../../rest/sitewhere-device-assignments-api";
import { Map as LeafletMap } from "leaflet";
import {
  IDeviceAssignment,
  IDeviceAssignmentResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentListEntry,
    AssignmentEmulatorMap,
    AlertCreateDialog
  }
})
export default class AssignmentEmulator extends DetailComponent<
  IDeviceAssignment
> {
  // References.
  $refs!: Refs<{
    map: AssignmentEmulatorMap;
    location: any;
    measurement: any;
    alert: AlertCreateDialog;
  }>;

  addLocationMode: boolean = false;

  /** Access the Leaflet map directly */
  getMap(): LeafletMap | null {
    return this.$refs.map ? this.$refs.map.getMap() : null;
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
    return this.assignment ? this.assignment.token : "";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDeviceAssignment> {
    let format: IDeviceAssignmentResponseFormat = {
      includeDevice: true
    };
    return getDeviceAssignment(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(assignment: IDeviceAssignment) {
    var section: INavigationSection = {
      id: "emulator",
      title: "Assignment Emulator",
      icon: NavigationIcon.DeviceAssignment,
      route: "/admin/assignments/emulator/" + assignment.token,
      longTitle: "Assignment Emulator: " + assignment.token
    };
    this.$store.commit("currentSection", section);
  }

  onLocationClicked() {}

  /** Called to open alert create dialog */
  onAddAlertClicked() {
    this.$refs.alert.open();
  }

  /** Called after alert is added */
  onAlertAdded() {}

  onPanToLastLocation() {}

  /** Called when map is clicked */
  onMapClicked(e: any) {
    this.onExitAddLocationMode();
    this.$emit("location", e);
  }

  /** Enter mode where next click adds a location */
  onEnterAddLocationMode() {
    this.addLocationMode = true;
    var component = this;
    var map = this.getMap();
    if (map) {
      map.on("click", function(e) {
        component.onMapClicked(e);
      });
    }
  }

  /** Exit mode where next click adds a location */
  onExitAddLocationMode() {
    this.addLocationMode = false;
    var map = this.getMap();
    if (map) {
      map.off("click");
    }
  }

  /** Called when measurement add is clicked */
  onAddMeasurementsClicked() {}

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
