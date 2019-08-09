<template>
  <v-card flat style="position: relative; height: 100%;">
    <sw-image-zoom-on-hover v-if="imageUrl" :imageUrl="imageUrl" />
    <span v-else>{{ assignment }}</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import {
  IDeviceAssignment,
  IDevice,
  IDeviceType,
  IAsset
} from "sitewhere-rest-api";

@Component({})
export default class AssignmentDetailHeaderImage extends Vue {
  @Prop() readonly assignment!: IDeviceAssignment;

  /** Accessor for device */
  get device(): IDevice {
    return this.assignment ? (this.assignment as any).device : null;
  }

  /** Accessor for device type */
  get deviceType(): IDeviceType {
    return this.device ? (this.device as any).deviceType : null;
  }

  /** Accessor for image URL */
  get imageUrl(): string | null {
    return this.deviceType ? this.deviceType.imageUrl : null;
  }

  /** Accessor for asset */
  get asset(): IAsset {
    return this.assignment ? (this.assignment as any).asset : null;
  }

  /** Accessor for area */
  get area() {
    return this.assignment ? (this.assignment as any).area : null;
  }

  // Compute style of image.
  imageStyle(url: string) {
    return {
      "background-color": "#fff",
      "background-image": "url(" + url + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }
}
</script>

<style scoped>
.header-image {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: 10px;
}
</style>
