<template>
  <div style="height: 100%;">
    <map-panel ref="map" class="map-content" :visible="visible" @ready="onInitializeMap" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { listLocationsForAssignment } from "sitewhere-ide-common";
import Vue from "vue";

import {
  Map as LeafletMap,
  LatLng,
  LatLngBounds,
  FeatureGroup,
  Marker,
  marker,
  featureGroup,
  polyline
} from "leaflet";
import MapPanel from "../../common/map/MapPanel.vue";

import {
  IDeviceAssignment,
  IDateRangeSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceLocationSearchResults,
  IDeviceLocation
} from "sitewhere-rest-api";
import { AxiosResponse } from "axios";

@Component({
  components: {
    MapPanel
  }
})
export default class AssignmentEmulatorMap extends Vue {
  @Prop() readonly assignment!: IDeviceAssignment;
  @Prop({ default: false }) readonly visible!: boolean;
  @Ref() readonly map!: MapPanel;

  locations: IDeviceLocation[] = [];
  lastLocation: LatLng | null = null;
  locationsLayer: FeatureGroup | null = null;

  /** Initialize map */
  onInitializeMap() {
    this.refreshLocations();
    this.$emit("ready");
  }

  /** Access the Leaflet map directly */
  getMap(): LeafletMap | null {
    return this.map ? this.map.getMap() : null;
  }

  /** Refresh list of locations */
  async refreshLocations(fitAll = true) {
    const criteria: IDateRangeSearchCriteria = {};
    const format: IDeviceAssignmentResponseFormat = {};
    const response: AxiosResponse<IDeviceLocationSearchResults> = await listLocationsForAssignment(
      this.$store,
      this.assignment.token,
      criteria,
      format
    );
    this.onLocationsLoaded(response.data.results, fitAll);
  }

  /** Called after locations are loaded for assignment */
  onLocationsLoaded(locations: IDeviceLocation[], fitAll = true) {
    this.locations = locations;
    this.addLocationsLayer(fitAll);
  }

  /** Add layer that contains recent locations */
  addLocationsLayer(fitAll = true) {
    let lastLocation = null;

    // Add newest last.
    const results = this.locations;
    results.reverse();

    // Gather markers and lat/long values.
    const latLngs: LatLng[] = [];
    const markers: Marker[] = [];
    results.forEach(location => {
      markers.push(marker([location.latitude, location.longitude]));
      const latLng = new LatLng(location.latitude, location.longitude);
      latLngs.push(latLng);
      lastLocation = latLng;
    });

    // Clear layer if it already exists.
    const layer = this.locationsLayer;
    if (layer) {
      layer.remove();
    }

    const map = this.getMap();
    if (map) {
      // Create layer for markers and line.
      const group = featureGroup(markers).addTo(map);
      if (latLngs.length > 1) {
        const line = polyline(latLngs, {
          stroke: true,
          color: "#005599",
          weight: 5,
          opacity: 0.3
        });
        group.addLayer(line);
      }
      this.locationsLayer = group;

      this.lastLocation = lastLocation;
      if (latLngs.length === 1) {
        map.setZoom(13);
        map.panTo(latLngs[0]);
      } else if (lastLocation) {
        if (fitAll) {
          const locBounds: LatLngBounds = this.locationsLayer.getBounds();
          map.fitBounds(locBounds, {
            padding: [10, 10],
            animate: false
          });
        }
        map.panTo(lastLocation);
      }
    }
  }

  /** Pan to the last recorded location */
  panToLastLocation() {
    const map = this.getMap();
    if (map && this.lastLocation) {
      map.panTo(this.lastLocation);
    }
  }
}
</script>
