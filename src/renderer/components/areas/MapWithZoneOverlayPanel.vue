<template>
  <map-panel :height="height" ref="map" @resetMap="onResetMap"></map-panel>
</template>

<script>
import MapPanel from "./MapPanel";
import MapUtils from "./MapUtils";

import { listZones } from "../../rest/sitewhere-zones-api";

import L from "leaflet";
import D from "leaflet-draw"; // eslint-disable-line no-unused-vars

export default {
  data: () => ({
    editControl: null,
    newZoneLayer: null,
    zoneBounds: null
  }),

  props: [
    "area",
    "height",
    "editedZoneToken",
    "bounds",
    "borderColor",
    "fillColor",
    "fillOpacity"
  ],

  components: {
    MapPanel
  },

  watch: {
    borderColor: function(val) {
      var newZoneLayer = this.getNewZoneLayer();
      if (newZoneLayer) {
        newZoneLayer.setStyle({ color: val });
      }
      this.updateEditControl();
    },
    fillColor: function(val) {
      var newZoneLayer = this.getNewZoneLayer();
      if (newZoneLayer) {
        newZoneLayer.setStyle({ fillColor: val });
      }
      this.updateEditControl();
    },
    fillOpacity: function(val) {
      var newZoneLayer = this.getNewZoneLayer();
      if (newZoneLayer) {
        newZoneLayer.setStyle({ fillOpacity: val });
      }
      this.updateEditControl();
    }
  },

  methods: {
    // Access the Leaflet map directly.
    getMap: function() {
      return this.$refs.map.getMap();
    },

    // Perform additional reset logic.
    onResetMap: function() {
      var map = this.getMap();
      var component = this;

      // Remove edit control.
      this.removeEditControl();

      map.off("draw:drawstart").on("draw:drawstart", function(e) {
        component.onZoneDrawStart(e);
      });
      map.off("draw:created").on("draw:created", function(e) {
        component.onZoneDrawComplete(e);
      });

      this.loadZoneLayers();
      if (this.editedZoneToken) {
        this.enableMapEditing();
      } else {
        this.enableMapDrawing();
      }

      // Fit area bounds.
      if (this.area && this.area.bounds) {
        let bounds = MapUtils.swToLeafletBounds(this.area.bounds);
        this.getMap().fitBounds(bounds, {
          padding: [0, 0]
        });
      }
    },

    // Remove existing edit control.
    removeEditControl: function() {
      var map = this.getMap;
      var edit = this.$data.editControl;
      if (edit) {
        map.removeControl(edit);
      }
    },

    // Get the edit control.
    updateEditControl: function() {
      var edit = this.$data.editControl;
      if (edit) {
        edit.setDrawingOptions(this.getDrawOptions());
      }
    },

    // Called when user begins drawing a zone.
    onZoneDrawStart: function(e) {
      this.removeNewZoneLayer();
      this.$emit("boundsUpdated", []);
    },

    // Called when zone drawing has been completed.
    onZoneDrawComplete: function(e) {
      this.addNewZoneLayer(e);
      var locations = MapUtils.leafletToSwBounds(e.layer._latlngs[0]);
      this.$emit("boundsUpdated", locations);
    },

    // Get layer that contains new zone.
    getNewZoneLayer: function() {
      return this.$data.newZoneLayer;
    },

    // Add new zone layer.
    addNewZoneLayer: function(e) {
      var zcNewZoneLayer = e.layer;
      this.getMap().addLayer(zcNewZoneLayer);
      this.$data.newZoneLayer = zcNewZoneLayer;
    },

    // Remove existing new zone layer.
    removeNewZoneLayer: function() {
      var newZoneLayer = this.getNewZoneLayer();
      if (newZoneLayer) {
        this.getMap().removeLayer(newZoneLayer);
        this.$data.newZoneLayer = null;
      }
    },

    // Load layers for area zones.
    loadZoneLayers: function() {
      // Asyncronously load zones and add layer to map.
      var component = this;
      if (this.area) {
        var options = {
          areaToken: this.area.token
        };
        listZones(this.$store, options)
          .then(function(response) {
            component.addZonesToFeatureGroup(response.data.results);
          })
          .catch(function(e) {});
      }
    },

    // Add zone layers to a feature group.
    addZonesToFeatureGroup: function(zones) {
      var featureGroup = new L.FeatureGroup();
      this.getMap().addLayer(featureGroup);

      // Add newest last.
      zones.reverse();

      for (var zoneIndex = 0; zoneIndex < zones.length; zoneIndex++) {
        var zone = zones[zoneIndex];
        if (zone.token !== this.editedZoneToken) {
          var polygon = this.createPolygonForZone(zone);
          featureGroup.addLayer(polygon);
        }
      }
    },

    // Create polygon that represents one zone.
    createPolygonForZone: function(zone) {
      var latLngs = MapUtils.swToLeafletBounds(zone.bounds);
      var polygon = new L.Polygon(latLngs, {
        color: zone.borderColor,
        opacity: 1,
        weight: 3,
        fillColor: zone.fillColor,
        fillOpacity: zone.opacity,
        clickable: false
      });
      return polygon;
    },

    // Get drawing options based on UI settings.
    getDrawOptions: function() {
      return {
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
        polygon: {
          shapeOptions: {
            color: this.borderColor,
            opacity: 1,
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity
          }
        },
        rectangle: {
          shapeOptions: {
            color: this.borderColor,
            opacity: 1,
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity
          }
        }
      };
    },

    /** Enables drawing features on map */
    enableMapDrawing: function() {
      var options = {
        position: "topright",
        edit: false
      };
      options.draw = this.getDrawOptions();

      var drawControl = new L.Control.Draw(options);
      this.getMap().addControl(drawControl);
      this.$data.editControl = drawControl;
    },

    // Enables editing features on map.
    enableMapEditing: function() {
      var editFeatures = new L.FeatureGroup();
      var latLngs = MapUtils.swToLeafletBounds(this.bounds);
      var editZone = new L.Polygon(latLngs, {
        color: this.borderColor,
        opacity: 1,
        weight: 3,
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        clickable: false
      });

      editFeatures.addLayer(editZone);
      this.getMap().addLayer(editFeatures);
      editFeatures.bringToFront();
      this.$data.newZoneLayer = editFeatures;

      var options = {
        position: "topright",
        draw: false,
        edit: {
          featureGroup: editFeatures,
          remove: false
        }
      };

      var drawControl = new L.Control.Draw(options);
      this.getMap().addControl(drawControl);
      this.$data.editControl = drawControl;

      var bounds = editZone.getBounds();
      this.getMap().fitBounds(bounds, {
        padding: [0, 0]
      });
    }
  }
};
</script>
