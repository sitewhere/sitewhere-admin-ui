<template>
  <div class="flex-rows">
    <div v-if="visible" class="map-content">
      <v-map :zoom="zoom" :center="center" style="z-index: 1;" ref="map" />
    </div>
    <sw-loading-overlay v-if="!mapReady" loadingMessage="Loading map..." />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";
import Vue from "vue";

import { Map as LeafletMap, Layer, TileLayer } from "leaflet";

@Component({})
export default class MapPanel extends Vue {
  @Prop({ default: false }) readonly visible!: boolean;
  @Prop({
    default: function() {
      return [47.41322, -1.219482];
    }
  })
  readonly center!: number[];
  @Prop({ default: 13 }) readonly zoom!: number;

  mapReady: boolean = false;

  // References.
  $refs!: Refs<{
    map: any;
  }>;

  @Watch("visible", { immediate: true })
  async onVisibilityUpdated(visible: boolean) {
    if (visible) {
      while (this.getMap() == null) {
        await this.sleep(100);
      }
      this.resetMap();
    }
  }

  /** Sleep asynchronously */
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Access the Leaflet map directly */
  getMap(): LeafletMap | null {
    return this.$refs.map ? this.$refs.map.mapObject : null;
  }

  /** Reset map */
  resetMap() {
    var map: LeafletMap | null = this.getMap();
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

<style scoped>
.flex-rows {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.map-content {
  flex: 1;
  overflow-y: hidden;
}
</style>
