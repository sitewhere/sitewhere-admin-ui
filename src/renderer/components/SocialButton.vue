<template>
  <v-tooltip left>
    <div class="sizer" slot="activator" @click="openLink()">
      <svg class="cfill" :viewBox="viewBox" v-html="svg"></svg>
    </div>
    <span>{{ title }}</span>
  </v-tooltip>
</template>

<script>
import Electron from "electron";
import { GoogleAnalytics } from "../libraries/GoogleAnalytics.ts";

export default {
  data: () => ({}),

  props: ["settings", "svg", "title", "url", "type", "width", "height"],

  computed: {
    viewBox: function() {
      return "0 0 " + this.width + " " + this.height;
    }
  },

  methods: {
    // Open link in external browser.
    openLink: function() {
      if (this.url) {
        Electron.shell.openExternal(this.url);
        GoogleAnalytics.sendSocialMediaEvent(this.settings, this.type);
      }
    }
  }
};
</script>

<style scoped>
.sizer {
  width: 70px;
  height: 70px;
  cursor: pointer;
  margin-bottom: 7px;
}
.cfill {
  fill: #999;
  fill-opacity: 0.5;
}
.cfill:hover {
  fill: #999;
  fill-opacity: 1;
}
</style>
