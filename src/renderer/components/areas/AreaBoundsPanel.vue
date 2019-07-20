<template>
  <div>
    <v-divider />
    <map-panel height="450px" ref="map" :visible="showMap" @ready="onInitializeMap" />
    <v-divider />
  </div>
</template>

<script lang="ts">
import Leaflet, {
  Component,
  Watch,
  Refs,
  DialogSection
} from "sitewhere-ide-common";
import Vue from "vue";

import MapPanel from "./MapPanel.vue";
import MapUtils from "./MapUtils";
import {
  LatLng,
  LatLngBounds,
  Polygon,
  Map,
  Control,
  Draw,
  FeatureGroup,
  latLngBounds as GetLatLongBounds,
  latLng as GetLatLong
} from "leaflet";
import XXX from "leaflet-draw"; // eslint-disable-line no-unused-vars

import { ILocation } from "sitewhere-rest-api";

@Component({
  components: {
    MapPanel
  }
})
export default class AreaBoundsPanel extends DialogSection {
  // References.
  $refs!: Refs<{
    map: MapPanel;
  }>;

  showMap: boolean = false;
  bounds: ILocation[] = [];
  editControl: Control.Draw | null = null;
  boundsLayer: Polygon | null = null;
  borderColor: string = "#446644";
  fillColor: string = "#779977";
  fillOpacity: number = 0.3;

  /** Make map visible */
  makeMapVisible() {
    this.showMap = true;
  }

  /** Initialize map */
  onInitializeMap() {
    var component = this;
    let map: Map | null = this.getMap();
    if (map) {
      // Remove and add event handlers.
      map.off(Draw.Event.DRAWSTART).on(Draw.Event.DRAWSTART, function(e) {
        component.removeBoundsLayer();
      });
      map.off(Draw.Event.CREATED).on(Draw.Event.CREATED, function(e) {
        component.addBoundsLayer(e);
      });
      map.off(Draw.Event.EDITED).on(Draw.Event.EDITED, function(e) {
        component.editBoundsLayer(e);
      });
      map.off(Draw.Event.DELETED).on(Draw.Event.DELETED, function(e) {
        component.bounds = [];
        component.removeBoundsLayer();
      });
    }

    // Update map with existing bounds.
    this.onBoundsSet(this.bounds);
  }

  /** Reset section content */
  reset(): void {
    this.bounds = [];
    this.borderColor = "#446644";
    this.fillColor = "#779977";
    this.fillOpacity = 0.3;
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: any): void {
    this.bounds = input.bounds;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      bounds: this.bounds
    };
  }

  /** Access the Leaflet map directly */
  getMap(): Map | null {
    return this.$refs.map ? this.$refs.map.getMap() : null;
  }

  @Watch("bounds")
  onBoundsSet(updated: ILocation[]) {
    let map: Map | null = this.getMap();
    if (map) {
      if (this.boundsLayer) {
        console.log("removing bounds layer");
        this.removeBoundsLayer();
      }

      if (updated && updated.length > 0) {
        console.log("adding new bounds layer for", updated);
        let latLongs: LatLng[] = MapUtils.swToLeafletBounds(updated);
        let lBounds: LatLngBounds = GetLatLongBounds(latLongs);
        if (latLongs && latLongs.length > 0) {
          var polygon = new Polygon(latLongs, {
            color: this.borderColor,
            opacity: 1,
            weight: 3,
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity
          });
          polygon.setStyle({ color: this.borderColor });
          polygon.setStyle({ fillColor: this.fillColor });
          polygon.setStyle({ fillOpacity: this.fillOpacity });
          this.boundsLayer = polygon;
          map.addLayer(polygon);
          map.fitBounds(lBounds, {
            padding: [10, 10]
          });
        }
      }

      /** Remove edit control */
      var edit = this.editControl;
      if (edit) {
        map.removeControl(edit);
      }

      if (this.boundsLayer) {
        this.enableMapEditing();
      } else {
        this.enableMapDrawing();
      }
    }
  }

  /** Get drawing options based on UI settings */
  getDrawOptions(): Control.DrawOptions {
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
  }

  /** Get editing options based on UI settings */
  getEditOptions(): Control.DrawOptions {
    return {
      polyline: false,
      circle: false,
      marker: false,
      circlemarker: false,
      polygon: false,
      rectangle: false
    };
  }

  /** Enables drawing features on map */
  enableMapDrawing() {
    let map: Map | null = this.getMap();
    if (map) {
      var options: Control.DrawConstructorOptions = {
        position: "topright"
      };
      options.draw = this.getDrawOptions();

      var drawControl = new Control.Draw(options);
      map.addControl(drawControl);
      this.editControl = drawControl;
    }
  }

  /** Enables editing features on map */
  enableMapEditing() {
    let map: Map | null = this.getMap();
    if (map) {
      if (this.boundsLayer) {
        var editFeatures = new FeatureGroup();
        editFeatures.addLayer(this.boundsLayer);
        map.addLayer(editFeatures);
        editFeatures.bringToFront();

        var options: Control.DrawConstructorOptions = {
          position: "topright",
          edit: {
            featureGroup: editFeatures,
            remove: true
          }
        };
        options.draw = this.getEditOptions();

        var drawControl = new Control.Draw(options);
        map.addControl(drawControl);
        this.editControl = drawControl;

        var bounds: LatLngBounds = this.boundsLayer.getBounds();
        if (!this.boundsLayer.isEmpty()) {
          map.fitBounds(bounds, {
            padding: [0, 0]
          });
        }
      }
    }
  }

  /** Add new bounds layer */
  addBoundsLayer(e: any) {
    let boundsLayer: Polygon = e.layer;
    this.bounds = MapUtils.leafletToSwBounds(boundsLayer.getLatLngs()[0]);
  }

  /** Edit existing bounds layer */
  editBoundsLayer(e: any) {
    if (this.boundsLayer) {
      this.bounds = MapUtils.leafletToSwBounds(
        this.boundsLayer.getLatLngs()[0]
      );
    }
  }

  /** Remove existing bounds layer */
  removeBoundsLayer() {
    let map: Map | null = this.getMap();
    if (this.boundsLayer && map) {
      map.removeLayer(this.boundsLayer);
      this.boundsLayer = null;
    }
  }
}
</script>
