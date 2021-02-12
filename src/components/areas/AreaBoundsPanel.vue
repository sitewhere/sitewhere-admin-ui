<template>
  <dialog-form>
    <v-flex xs12>
      <map-with-zone-overlay-panel
        style="height: 450px; border: 1px solid #ddd;"
        ref="map"
        :areaToken="areaToken"
        :visible="mapVisible"
        @ready="onInitializeMap"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Watch, Ref, Prop } from "vue-property-decorator";
import { DialogSection, DialogForm } from "sitewhere-ide-components";

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
    DialogForm,
    MapWithZoneOverlayPanel
  }
})
export default class AreaBoundsPanel extends DialogSection {
  @Ref() readonly map!: MapWithZoneOverlayPanel;
  @Prop() readonly mapVisible!: boolean;

  areaToken: string | undefined = undefined;
  bounds: ILocation[] = [];
  editControl: Control.Draw | null = null;
  boundsLayer: Polygon | null = null;
  borderColor = "#446644";
  borderOpacity = 0.8;
  fillColor = "#779977";
  fillOpacity = 0.3;
  
  // Prevent unused warning.
  xxx: any = XXX;

  /** Initialize map */
  onInitializeMap() {
    const map: LeafletMap | null = this.getMap();
    if (map) {
      // Remove and add event handlers.
      map.off(Draw.Event.DRAWSTART).on(Draw.Event.DRAWSTART, () => {
        this.removeBoundsLayer();
      });
      map.off(Draw.Event.CREATED).on(Draw.Event.CREATED, e => {
        this.addBoundsLayer(e);
      });
      map.off(Draw.Event.EDITED).on(Draw.Event.EDITED, () => {
        this.editBoundsLayer();
      });
      map.off(Draw.Event.DELETED).on(Draw.Event.DELETED, () => {
        this.bounds = [];
        this.removeBoundsLayer();
      });
    }

    // Update map with existing bounds.
    this.onBoundsSet(this.bounds);
  }

  /** Reset section content */
  reset(): void {
    console.log("reset called");
    if (this.map) {
      console.log("map reset called");
      this.map.refresh();
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
    return this.map ? this.map.getMap() : null;
  }

  @Watch("bounds")
  onBoundsSet(updated: ILocation[]) {
    const map: LeafletMap | null = this.getMap();
    if (map) {
      if (this.boundsLayer) {
        this.removeBoundsLayer();
      }

      if (updated && updated.length > 0) {
        const latLongs: LatLng[] = swToLeafletBounds(updated);
        const lBounds: LatLngBounds = GetLatLongBounds(latLongs);
        if (latLongs && latLongs.length > 0) {
          const polygon = new Polygon(latLongs, {
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
      const edit = this.editControl;
      if (edit) {
        map.removeControl(edit);
      }

      if (this.boundsLayer) {
        this.editControl = enableMapEditing(map, this.boundsLayer);
      } else {
        const zone: IZoneCreateRequest = {
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
    const boundsLayer: Polygon = e.layer;
    this.bounds = leafletToSwBounds(boundsLayer.getLatLngs()[0]);
  }

  /** Edit existing bounds layer */
  editBoundsLayer() {
    if (this.boundsLayer) {
      this.bounds = leafletToSwBounds(this.boundsLayer.getLatLngs()[0]);
    }
  }

  /** Remove existing bounds layer */
  removeBoundsLayer() {
    const map: LeafletMap | null = this.getMap();
    if (this.boundsLayer && map) {
      map.removeLayer(this.boundsLayer);
      this.boundsLayer = null;
    }
  }
}
</script>
