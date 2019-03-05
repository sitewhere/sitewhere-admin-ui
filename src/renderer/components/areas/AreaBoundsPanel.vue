<template>
  <map-panel height="450px" ref="map" @resetMap="onResetMap"></map-panel>
</template>

<script>
import MapPanel from "./MapPanel";
import MapUtils from "./MapUtils";
import L from "leaflet";
import D from "leaflet-draw"; // eslint-disable-line no-unused-vars

export default {
  data: () => ({
    editBounds: null,
    editControl: null,
    boundsLayer: null,
    borderColor: "#446644",
    fillColor: "#779977",
    fillOpacity: 0.3
  }),

  components: {
    MapPanel
  },

  props: ["bounds"],

  watch: {
    bounds: {
      immediate: true,
      handler: function(val) {
        this.$data.editBounds = val;
        if (this.$refs.map) {
          this.onResetMap();
        }
      }
    }
  },

  methods: {
    // Access the Leaflet map directly.
    getMap: function() {
      return this.$refs.map.getMap();
    },

    // Perform additional reset logic.
    onResetMap: function() {
      var component = this;
      let map = this.getMap();

      // Remove edit control.
      var edit = this.$data.editControl;
      if (edit) {
        map.removeControl(edit);
      }

      let bounds = this.$data.editBounds;
      if (bounds && !this.$data.boundsLayer) {
        let lBounds = MapUtils.swToLeafletBounds(bounds);
        if (lBounds && lBounds.length > 0) {
          console.log(lBounds);
          var polygon = new L.Polygon(lBounds, {
            color: this.$data.borderColor,
            opacity: 1,
            weight: 3,
            fillColor: this.$data.fillColor,
            fillOpacity: this.$data.fillOpacity,
            clickable: false
          });
          this.$data.boundsLayer = polygon;
          this.getMap().addLayer(polygon);
          this.getMap().fitBounds(lBounds, {
            padding: [10, 10]
          });
        }
      }

      if (this.$data.boundsLayer) {
        this.enableMapEditing();
      } else {
        this.enableMapDrawing();
      }

      // Remove and add event handlers.
      map.off("draw:drawstart").on("draw:drawstart", function(e) {
        component.removeBoundsLayer();
      });
      map.off("draw:created").on("draw:created", function(e) {
        component.addBoundsLayer(e);
      });
      map.off("draw:deleted").on("draw:deleted", function(e) {
        component.removeBoundsLayer(e);
      });
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
            color: this.$data.borderColor,
            opacity: 1,
            fillColor: this.$data.fillColor,
            fillOpacity: this.$data.fillOpacity
          }
        },
        rectangle: {
          shapeOptions: {
            color: this.$data.borderColor,
            opacity: 1,
            fillColor: this.$data.fillColor,
            fillOpacity: this.$data.fillOpacity
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
      editFeatures.addLayer(this.$data.boundsLayer);
      this.getMap().addLayer(editFeatures);
      editFeatures.bringToFront();

      var options = {
        position: "topright",
        draw: false,
        edit: {
          featureGroup: editFeatures,
          remove: true
        }
      };

      var drawControl = new L.Control.Draw(options);
      this.getMap().addControl(drawControl);
      this.$data.editControl = drawControl;

      var bounds = this.$data.boundsLayer.getBounds();
      if (bounds && bounds.length > 0) {
        console.log(bounds);
        this.getMap().fitBounds(bounds, {
          padding: [0, 0]
        });
      }
    },

    // Add new bounds layer.
    addBoundsLayer: function(e) {
      var boundsLayer = e.layer;
      boundsLayer.setStyle({ color: this.$data.borderColor });
      boundsLayer.setStyle({ fillColor: this.$data.fillColor });
      boundsLayer.setStyle({ fillOpacity: this.$data.fillOpacity });
      this.getMap().addLayer(boundsLayer);
      this.$data.boundsLayer = boundsLayer;
      this.$emit("boundsUpdated", boundsLayer._latlngs[0]);
      this.onResetMap();
    },

    // Remove existing bounds layer.
    removeBoundsLayer: function() {
      var boundsLayer = this.$data.boundsLayer;
      if (boundsLayer) {
        this.getMap().removeLayer(boundsLayer);
        this.$data.boundsLayer = null;
        this.$data.editBounds = null;
        this.$emit("boundsUpdated", null);
        this.onResetMap();
      }
    }
  }
};
</script>

<style scoped>
</style>
