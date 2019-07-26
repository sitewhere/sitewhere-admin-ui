<template>
  <div>
    <map-with-zone-overlay-panel
      style="height: 450px; border: 1px solid #ddd;"
      ref="map"
      :areaToken="areaToken"
      :visible="showMap"
      @ready="onInitializeMap"
    />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Refs, DialogSection } from "sitewhere-ide-common";

import MapWithZoneOverlayPanel from "../common/map/MapWithZoneOverlayPanel.vue";
import {
  swToLeafletBounds,
  leafletToSwBounds,
  enableMapDrawing,
  enableMapEditing
} from "../common/map/MapUtils";

import {
  LatLng,
  LatLngBounds,
  Polygon,
  Map as LeafletMap,
  Control,
  Draw,
  latLngBounds as GetLatLongBounds
} from "leaflet";
import XXX from "leaflet-draw";

import { ILocation, IArea, IZoneCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    MapWithZoneOverlayPanel
  }
})
export default class AreaBoundsPanel extends DialogSection {
  // References.
  $refs!: Refs<{
    map: MapWithZoneOverlayPanel;
  }>;

  showMap: boolean = false;
  areaToken: string | undefined = undefined;
  bounds: ILocation[] = [];
  editControl: Control.Draw | null = null;
  boundsLayer: Polygon | null = null;
  borderColor: string = "#446644";
  borderOpacity: number = 0.8;
  fillColor: string = "#779977";
  fillOpacity: number = 0.3;

  // Prevent unused warning.
  xxx: any = XXX;

  /** Make map visible */
  makeMapVisible() {
    this.showMap = true;
  }

  /** Initialize map */
  onInitializeMap() {
    var component = this;
    let map: LeafletMap | null = this.getMap();
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
    // Refresh zones.
    if (this.$refs.map) {
      this.$refs.map.refresh();
    }

    // Reset fields.
    this.areaToken = undefined;
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
  load(input: IArea): void {
    this.areaToken = input.token;
    this.bounds = input.bounds;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      bounds: this.bounds
    };
  }

  /** Access the Leaflet map directly */
  getMap(): LeafletMap | null {
    return this.$refs.map ? this.$refs.map.getMap() : null;
  }

  @Watch("bounds")
  onBoundsSet(updated: ILocation[]) {
    let map: LeafletMap | null = this.getMap();
    if (map) {
      if (this.boundsLayer) {
        this.removeBoundsLayer();
      }

      if (updated && updated.length > 0) {
        let latLongs: LatLng[] = swToLeafletBounds(updated);
        let lBounds: LatLngBounds = GetLatLongBounds(latLongs);
        if (latLongs && latLongs.length > 0) {
          var polygon = new Polygon(latLongs, {
            opacity: 1,
            weight: 3
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
        this.editControl = enableMapEditing(map, this.boundsLayer);
      } else {
        let zone: IZoneCreateRequest = {
          areaToken: "",
          name: "",
          bounds: [],
          borderColor: this.borderColor,
          borderOpacity: this.borderOpacity,
          fillColor: this.fillColor,
          fillOpacity: this.fillOpacity
        };
        this.editControl = enableMapDrawing(map, zone);
      }
    }
  }

  /** Add new bounds layer */
  addBoundsLayer(e: any) {
    let boundsLayer: Polygon = e.layer;
    this.bounds = leafletToSwBounds(boundsLayer.getLatLngs()[0]);
  }

  /** Edit existing bounds layer */
  editBoundsLayer(e: any) {
    if (this.boundsLayer) {
      this.bounds = leafletToSwBounds(this.boundsLayer.getLatLngs()[0]);
    }
  }

  /** Remove existing bounds layer */
  removeBoundsLayer() {
    let map: LeafletMap | null = this.getMap();
    if (this.boundsLayer && map) {
      map.removeLayer(this.boundsLayer);
      this.boundsLayer = null;
    }
  }
}
</script>
