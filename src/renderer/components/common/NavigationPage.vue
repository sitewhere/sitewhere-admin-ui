<template>
  <v-card class="flex-rows" flat fill-height>
    <v-toolbar class="elevation-1 toolbar" dense>
      <v-icon>{{ icon }}</v-icon>
      <v-toolbar-title class="ml-2 subheading">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="actions"/>
    </v-toolbar>
    <div class="header">
      <slot name="header"/>
    </div>
    <div class="content">
      <slot v-if="loaded" name="content"/>
    </div>
    <div class="footer">
      <slot name="footer"/>
    </div>
    <loading-overlay v-if="!loaded" :loadingMessage="loadingMessage"/>
    <slot name="dialogs"/>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import LoadingOverlay from "./LoadingOverlay.vue";

@Component({
  components: {
    LoadingOverlay
  }
})
export default class NavigationPage extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
}
</script>

<style scoped>
.flex-rows {
  display: flex;
  flex-direction: column;
}
.toolbar {
  flex: 0;
  z-index: 1;
  color: #333;
}
.header {
  flex: 0;
  z-index: 1;
}
.content {
  flex: 1;
  overflow-y: auto;
  z-index: 0;
}
.footer {
  flex: 0;
  z-index: 1;
}
</style>
