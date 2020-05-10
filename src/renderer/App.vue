<template>
  <router-view />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~vuetify/dist/vuetify.min.css";
@import "~leaflet/dist/leaflet.css";
@import "~leaflet-draw/dist/leaflet.draw.css";
@import "~highlight.js/styles/default.css";
@import "~flatpickr/dist/flatpickr.css";
@import "~material-icons/iconfont/material-icons.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
</style>
