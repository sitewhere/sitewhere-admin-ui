<template>
  <map-panel ref="map" :visible="visible" @ready="onInitializeMap" />
</template>

<script lang="ts">
import { Component, Prop, Refs } from "sitewhere-ide-common";
import Vue from "vue";

import MapPanel from "./MapPanel.vue";
import { swToLeafletBounds } from "./MapUtils";

import {
  Polygon,
  Map as LeafletMap,
  FeatureGroup,
  LatLngBounds
} from "leaflet";

import { AxiosResponse } from "axios";
import { listZones } from "../../../rest/sitewhere-zones-api";
import {
  IZone,
  IZoneSearchCriteria,
  IZoneResponseFormat,
  IZoneSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    MapPanel
  }
})
export default class MapWithZoneOverlayPanel extends Vue {
  @Prop({ default: false }) readonly visible!: boolean;
  @Prop() readonly areaToken!: string;
  @Prop({
    default: function() {
      return [];
    }
  })
  readonly ignoreZoneTokens!: string[];
  @Prop({ default: false }) readonly zoomToZones!: boolean;

  // References.
  $refs!: Refs<{
    map: MapPanel;
  }>;

  showMap: boolean = false;
  zonesGroup: FeatureGroup | null = null;

  /** Make map visible */
  makeMapVisible() {
    this.showMap = true;
  }

  /** Initialize map */
  onInitializeMap() {
    this.refresh();
    this.$emit("ready");
  }

  /** Access the Leaflet map directly */
  getMap(): LeafletMap | null {
    return this.$refs.map ? this.$refs.map.getMap() : null;
  }

  /** Refresh content */
  refresh() {
    this.loadZoneLayers();
  }

  /** Load layers for area zones */
  async loadZoneLayers() {
    let map: LeafletMap | null = this.getMap();
    if (map) {
      // Remove existing zone overlay.
      if (this.zonesGroup) {
        map.removeLayer(this.zonesGroup);
      }

      if (!this.areaToken) {
        return;
      }

      let criteria: IZoneSearchCriteria = {
        areaToken: this.areaToken
      };
      let format: IZoneResponseFormat = {};
      let response: AxiosResponse<IZoneSearchResults> = await listZones(
        this.$store,
        criteria,
        format
      );
      this.addZonesToFeatureGroup(map, response.data.results);
    }
  }

  /** Add zone layers to a feature group */
  addZonesToFeatureGroup(map: LeafletMap, zones: IZone[]) {
    this.zonesGroup = new FeatureGroup();
    map.addLayer(this.zonesGroup);

    // Add newest last.
    zones.reverse();

    zones.forEach(zone => {
      if (this.ignoreZoneTokens.indexOf(zone.token) === -1) {
        var polygon = this.createPolygonForZone(zone);
        if (this.zonesGroup) {
          this.zonesGroup.addLayer(polygon);
        }
      } else {
        console.log("ignored zone", zone.token);
      }
    });

    if (this.zoomToZones) {
      let zoneBounds: LatLngBounds = this.zonesGroup.getBounds();
      map.fitBounds(zoneBounds, {
        padding: [10, 10]
      });
    }
  }

  /** Create polygon that represents one zone */
  createPolygonForZone(zone: IZone) {
    var latLngs = swToLeafletBounds(zone.bounds);
    var polygon = new Polygon(latLngs, {
      color: zone.borderColor,
      opacity: zone.borderOpacity,
      weight: 3,
      fillColor: zone.fillColor,
      fillOpacity: zone.fillOpacity
    });
    return polygon;
  }
}
</script>
