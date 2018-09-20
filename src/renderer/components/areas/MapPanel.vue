<template>
  <div>
    <div :style="{ 'height': height, 'width': '100%' }">
      <v-map :zoom="13" :center="[47.413220, -1.219482]" style="z-index: 1;" ref="map">
      </v-map>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {

  data: () => ({
  }),

  props: ['height'],

  // Called when DOM is mounted.
  mounted: function () {
    this.resetMap()
    this.invalidateMap()
  },

  methods: {
    // Access the Leaflet map directly.
    getMap: function () {
      return this.$refs.map.mapObject
    },

    // Invalid map size to force redraw.
    invalidateMap: function () {
      this.getMap().invalidateSize()
    },

    // Reset map.
    resetMap: function () {
      var map = this.getMap()

      // Remove layers.
      map.eachLayer(function (layer) {
        map.removeLayer(layer)
      })

      // Add tile layer for open street map.
      var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      var osm = new L.TileLayer(osmUrl, {
        maxZoom: 20
      })
      osm.addTo(this.getMap())
      this.$emit('resetMap')
    }
  }
}
</script>

<style scoped>
</style>
