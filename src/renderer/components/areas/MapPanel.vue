<template>
  <div style="position: relative;">
    <div v-if="visible" :style="{ 'height': height, 'width': '100%' }">
      <v-map :zoom="13" :center="[47.413220, -1.219482]" style="z-index: 1;" ref="map"></v-map>
    </div>
    <sw-loading-overlay v-if="!mapReady" loadingMessage="Loading map..." />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";
import Vue from "vue";

import { Map, Layer, TileLayer } from "leaflet";

@Component({})
export default class MapPanel extends Vue {
  @Prop() readonly height!: number;
  @Prop({ default: false }) readonly visible!: boolean;

  mapReady: boolean = false;

  // References.
  $refs!: Refs<{
    map: any;
  }>;

  @Watch("visible")
  async onVisibilityUpdated(updated: boolean) {
    while (this.getMap() == null) {
      await this.sleep(100);
    }
    this.resetMap();
  }

  /** Sleep asynchronously */
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Access the Leaflet map directly */
  getMap(): Map | null {
    return this.$refs.map ? this.$refs.map.mapObject : null;
  }

  /** Reset map */
  resetMap() {
    var map: Map | null = this.getMap();
    if (map) {
      // Remove layers.
      map.eachLayer(function(layer: Layer) {
        if (map) {
          map.removeLayer(layer);
        }
      });

      // Add tile layer for open street map.
      var osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
      var osm = new TileLayer(osmUrl, {
        maxZoom: 20
      });
      osm.addTo(map);
      map.invalidateSize();
      this.mapReady = true;
      this.$emit("ready");
    }
  }
}
</script>
