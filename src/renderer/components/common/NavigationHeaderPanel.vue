<template>
  <v-card flat :style="panelStyle" class="white mt-2 mb-3 pr-3 pl-3 header-panel">
    <v-card-text>
      <span v-if="imageUrl" class="header-image" :style="imageStyle"></span>
      <span v-if="icon" class="header-icon">
        <font-awesome-icon class="grey--text" :icon="icon" size="6x"/>
      </span>
      <span class="header-content">
        <slot name="content"></slot>
      </span>
      <authenticated-image class="header-qrcode" :style="qrCodeStyle" :url="qrCodeUrl"/>
      <span class="options-menu">
        <slot name="options"></slot>
      </span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import AuthenticatedImage from "./AuthenticatedImage.vue";

@Component({
  components: {
    AuthenticatedImage
  }
})
export default class NavigationHeaderPanel extends Vue {
  @Prop() readonly height!: string;
  @Prop() readonly imageUrl!: string;
  @Prop() readonly qrCodeUrl!: string;
  @Prop() readonly icon!: string;

  // Style for top-level panel.
  get panelStyle() {
    return {
      "min-height": this.height
    };
  }

  // Compute style of image.
  get imageStyle() {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }

  // Compute style for QR code URL.
  get qrCodeStyle() {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.qrCodeUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }
}
</script>

<style scoped>
.header-panel {
  min-width: 920px;
  overflow-y: hidden;
}

.header-image {
  position: absolute;
  top: 10px;
  left: 50px;
  bottom: 7px;
  width: 180px;
}

.header-icon {
  position: absolute;
  top: 10px;
  left: 50px;
  bottom: 7px;
  width: 180px;
  padding: 45px;
  border: 1px solid #eee;
}

.header-qrcode {
  position: absolute;
  top: 10px;
  right: 50px;
  bottom: 7px;
  width: 180px;
  height: 180px;
}

.header-content {
  position: absolute;
  top: 20px;
  left: 250px;
  right: 250px;
}

.options-menu {
  position: absolute;
  top: 10px;
  right: 190px;
}
</style>
