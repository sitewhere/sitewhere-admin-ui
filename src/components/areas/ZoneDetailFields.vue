<template>
  <dialog-form>
    <v-flex xs12>
      <map-with-zone-overlay-panel
        style="height: 400px; border: 1px solid #ddd;"
        ref="map"
        :areaToken="areaToken"
        :visible="mapVisible"
        :zoomToZones="false"
        :ignoreZoneTokens="ignoredZones"
        @ready="onInitializeMap"
      />
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6 class="mb-2">
            <v-text-field
              class="mr-4"
              required
              label="Token"
              v-model="token"
              placeholder=" "
              hide-details
              prepend-icon="info"
            />
            <div class="verror">
              <span v-if="!$v.token.required && $v.$dirty">Token is required.</span>
              <span v-if="!$v.token.validToken && $v.$dirty">Token is not valid.</span>
            </div>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              required
              hide-details
              label="Zone name"
              v-model="name"
              placeholder=" "
              prepend-icon="info"
            />
            <div class="verror">
              <span v-if="$v.name.$invalid && $v.$dirty">Zone name is required.</span>
            </div>
          </v-flex>
          <v-flex xs6>
            <color-input-field label="Border" v-model="borderColor" />
          </v-flex>
          <v-flex xs6>
            <color-input-field label="Fill" v-model="fillColor" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop, Watch, Ref } from "vue-property-decorator";

import {
  DialogSection,
  DialogForm,
  ColorInputField
} from "sitewhere-ide-components";

import MapWithZoneOverlayPanel from "../common/map/MapWithZoneOverlayPanel.vue";
import {
  swToLeafletBounds,
  leafletToSwBounds,
  enableMapDrawing,
  enableMapEditing
} from "../common/map/MapUtils";

import { required, helpers } from "vuelidate/lib/validators";
import { ILocation, IArea, IZoneCreateRequest } from "sitewhere-rest-api";
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

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    ColorInputField,
    MapWithZoneOverlayPanel
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    borderColor: {
      required
    },
    fillColor: {
      required
    }
  }
})
export default class ZoneDetailFields extends DialogSection {
  @Prop() readonly area!: IArea;
  @Prop() readonly mapVisible!: boolean;
  @Ref() readonly map!: MapWithZoneOverlayPanel;

  token: string | null = null;
  name: string | null = null;
  bounds: ILocation[] = [];
  borderColor = "#333333FF";
  fillColor = "#CCCCCCFF";
  editControl: Control.Draw | null = null;
  zoneLayer: Polygon | null = null;

  xxx: any = XXX;

  /** Getter for area token */
  get areaToken() {
    return this.area ? this.area.token : null;
  }

  /** Getter for ignored zone tokens */
  get ignoredZones(): string[] {
    return this.token ? [this.token] : [];
  }

  /** Called when map is ready */
  onInitializeMap() {
    const map: LeafletMap | null = this.getMap();

    // Hook up event handlers.
    if (map) {
      map.off(Draw.Event.DRAWSTART).on(Draw.Event.DRAWSTART, () => {
        this.removeZoneLayer();
      });
      map.off(Draw.Event.CREATED).on(Draw.Event.CREATED, e => {
        this.addZoneLayer(e);
      });
      map.off(Draw.Event.EDITED).on(Draw.Event.EDITED, () => {
        this.editZoneLayer();
      });
      map.off(Draw.Event.DELETED).on(Draw.Event.DELETED, () => {
        this.bounds = [];
        this.removeZoneLayer();
      });
    }

    // Zoom and center on area bounds.
    if (this.area.bounds) {
      const latLongs: LatLng[] = swToLeafletBounds(this.area.bounds);
      if (map) {
        map.fitBounds(GetLatLongBounds(latLongs), {
          padding: [10, 10]
        });
      }
    }

    // Update map with existing bounds.
    this.onBoundsSet(this.bounds);
  }

  /** Access the Leaflet map directly */
  getMap(): LeafletMap | null {
    return this.map ? this.map.getMap() : null;
  }

  /** Reset section content */
  reset(): void {
    if (this.map) {
      this.map.refresh();
    }

    // Reset fields.
    this.token = null;
    this.name = null;
    this.bounds = [];
    this.borderColor = "#333333FF";
    this.fillColor = "#CCCCCCFF";
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    if (!this.zoneLayer) {
      return false;
    }

    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IZoneCreateRequest): void {
    this.token = input.token || "";
    this.name = input.name;
    this.bounds = input.bounds;
    this.borderColor = input.borderColor || "#333333FF";
    this.fillColor = input.fillColor || "#CCCCCCFF";
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      bounds: this.bounds,
      borderColor: this.borderColor,
      borderOpacity: 1.0,
      fillColor: this.fillColor,
      fillOpacity: 1.0
    };
  }

  @Watch("bounds")
  onBoundsSet(updated: ILocation[]) {
    const map: LeafletMap | null = this.getMap();
    if (map) {
      // Remove zone layer if already existing.
      if (this.zoneLayer) {
        this.removeZoneLayer();
      }

      // Create zone polygon layer.
      if (updated && updated.length > 0) {
        const latLongs: LatLng[] = swToLeafletBounds(updated);
        const lBounds: LatLngBounds = GetLatLongBounds(latLongs);
        if (latLongs && latLongs.length > 0) {
          const polygon = new Polygon(latLongs, {
            weight: 3
          });
          this.zoneLayer = polygon;
          this.updateZoneStyle();
          map.addLayer(polygon);
          map.fitBounds(lBounds, {
            padding: [10, 10]
          });
        }
      }

      this.prepareDrawControls(map);
    }
  }

  /** Prepare drawing controls */
  prepareDrawControls(map: LeafletMap) {
    /** Remove edit control */
    const edit = this.editControl;
    if (edit) {
      map.removeControl(edit);
    }

    if (this.zoneLayer) {
      this.editControl = enableMapEditing(map, this.zoneLayer);
    } else {
      const zone: IZoneCreateRequest = {
        areaToken: "",
        name: "",
        bounds: [],
        borderColor: this.borderColor ? this.borderColor.substring(0, 7) : "#333333",
        borderOpacity: this.borderColor ? parseInt('0x' + this.borderColor.substring(7, 9)) / 255.0 : 1.0,
        fillColor: this.fillColor ? this.fillColor.substring(0, 7) : "#CCCCCC",
        fillOpacity: this.fillColor ? parseInt('0x' + this.fillColor.substring(7, 9)) / 255.0 : 1.0
      };
      this.editControl = enableMapDrawing(map, zone);
    }
  }

  @Watch("borderColor")
  @Watch("fillColor")
  onStyleSet() {
    this.updateZoneStyle();
  }

  /** Update style of zone based on selections */
  updateZoneStyle() {
    if (this.zoneLayer) {
      this.zoneLayer.setStyle({
        color: this.borderColor ? this.borderColor.substring(0, 7) : "#333333"
      });
      this.zoneLayer.setStyle({
        opacity: this.borderColor ? parseInt('0x' + this.borderColor.substring(7, 9)) / 255.0 : 1.0
      });
      this.zoneLayer.setStyle({
        fillColor: this.fillColor ? this.fillColor.substring(0, 7) : "#CCCCCC"
      });
      this.zoneLayer.setStyle({
        fillOpacity: this.fillColor ? parseInt('0x' + this.fillColor.substring(7, 9)) / 255.0 : 1.0
      });
    }
  }

  /** Add new zone layer */
  addZoneLayer(e: any) {
    const zoneLayer: Polygon = e.layer;
    this.bounds = leafletToSwBounds(zoneLayer.getLatLngs()[0]);
  }

  /** Edit existing zone layer */
  editZoneLayer() {
    if (this.zoneLayer) {
      this.bounds = leafletToSwBounds(this.zoneLayer.getLatLngs()[0]);
      console.log("edit zone set bounds to", this.bounds);
    }
  }

  /** Remove existing zone layer */
  removeZoneLayer() {
   const map: LeafletMap | null = this.getMap();
    if (this.zoneLayer && map) {
      map.removeLayer(this.zoneLayer);
      this.zoneLayer = null;
    }
  }
}
</script>
