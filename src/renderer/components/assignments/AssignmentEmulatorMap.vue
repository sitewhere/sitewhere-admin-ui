<template>
  <div>
    <v-map :zoom="zoom" ref="map" :center="centerMarker" style="height: 800px; z-index: 1;">
      <v-tilelayer :url="url"></v-tilelayer>
    </v-map>
    <div class="loc-overlay" v-if="addLocationMode">
      <span class="loc-overlay-text">Click Map to Add Location Event</span>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

import { listLocationsForAssignment } from "../../rest/sitewhere-device-assignments-api";
import { lchown } from "fs";

export default {
  data: () => ({
    map: null,
    locations: null,
    lastLocation: null,
    locationsLayer: null,
    addLocationMode: false,
    areaLayers: [],
    zoom: 20,
    center: [34.102775330967646, -84.23660204977593],
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  }),

  props: ["assignment", "height"],

  components: {},

  // Only load site after map is mounted.
  created: function() {},

  // Called when DOM is mounted.
  mounted: function() {
    this.onResetMap();
  },
  computed: {
    // Calculate center of Map
    centerMarker: function() {
      if (this.$data.lastLocation) {
        return this.$data.lastLocation;
      }
      var centerMarker = {};
      centerMarker.lat = 34.102775330967646;
      centerMarker.lng = -84.23660204977593;
      return centerMarker;
    }
  },

  methods: {
    // Access the Leaflet map directly.
    getMap: function() {
      return this.$refs.map.mapObject;
    },

    // Perform additional reset logic.
    onResetMap: function() {
      var map = this.getMap();
      var component = this;
      this.removeZoneLayer();
      map.off("draw:created").on("draw:created", function(e) {
        component.onZoneDrawComplete(e);
      });
      this.refreshLocations();
    },
    removeZoneLayer: function() {
      var component = this;
      for (var i = 0; i < component.areaLayers.length; i++) {
        var areaLayer = component.areaLayers[i];
        this.getMap().removeLayer(areaLayer);
      }
      component.areaLayers = [];
    },

    // Refresh list of locations.
    refreshLocations: function() {
      // Load list of locations for assignment.
      var component = this;
      listLocationsForAssignment(this.$store, this.assignment.token)
        .then(function(response) {
          component.onLocationsLoaded(response.data.results);
        })
        .catch(function(e) {});
    },

    // Called after locations are loaded for assignment.
    onLocationsLoaded: function(locations) {
      this.$data.locations = locations;
      this.addLocationsLayer();
    },

    // Add layer that contains recent locations.
    addLocationsLayer: function() {
      let lastLocation = null;

      // Add newest last.
      let results = this.$data.locations;
      results.reverse();
      // Gather markers and lat/long values.
      let latLngs = [];
      let markers = [];
      for (var locIndex = 0; locIndex < results.length; locIndex++) {
        let location = results[locIndex];
        markers.push(L.marker([location.latitude, location.longitude]));
        let latLng = new L.LatLng(location.latitude, location.longitude);
        latLngs.push(latLng);
        lastLocation = latLng;
      }

      // Clear layer if it already exists.
      let map = this.getMap();
      let layer = this.$data.locationsLayer;
      if (layer) {
        layer.remove();
      }

      // Create layer for markers and line.
      let group = L.featureGroup(markers).addTo(map);
      if (latLngs.length > 0) {
        let line = L.polyline(latLngs, {
          stroke: true,
          color: "#005599",
          weight: 5,
          opacity: 0.5
        });
        group.addLayer(line);
      }
      this.$data.locationsLayer = group;

      this.$data.lastLocation = lastLocation;
      if (lastLocation) {
        map.setView(lastLocation);
      }
    },

    // Called when map is clicked.
    onMapClicked: function(e) {
      this.exitAddLocationMode();
      this.$emit("location", e);
    },

    // Enter mode where next click adds a location.
    enterAddLocationMode: function() {
      this.$data.addLocationMode = true;
      var component = this;
      var map = this.getMap();
      map.on("click", function(e) {
        component.onMapClicked(e);
      });
    },

    // Exit mode where next click adds a location.
    exitAddLocationMode: function() {
      this.$data.addLocationMode = false;
      var map = this.getMap();
      map.off("click");
    },

    // Pan to the last recorded location.
    panToLastLocation: function() {
      if (this.$data.lastLocation) {
        this.getMap().panTo(this.$data.lastLocation);
      }
    },

    // Called when zone drawing has been completed.
    onZoneDrawComplete: function(e) {
      this.addNewZoneLayer(e);
      var locations = this.leafletToSwBounds(e.layer._latlngs[0]);
      this.$emit("boundsUpdated", locations);
    }
  }
};
</script>

<style scoped>
.loc-overlay {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #fff;
  opacity: 0.8;
  padding: 10px 20px;
  z-index: 500;
  text-align: center;
}
.loc-overlay-text {
  font-size: 28px;
}
</style>
