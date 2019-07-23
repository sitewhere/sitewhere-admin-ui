<template>
  <v-card flat style="position: relative; height: 100%;">
    <span v-if="imageUrl" class="header-image" :style="imageStyle(imageUrl)" />
    <span v-else>{{ device }}</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";
import { IDevice, IDeviceType } from "sitewhere-rest-api";

@Component({})
export default class DeviceDetailHeaderImage extends Vue {
  @Prop() readonly device!: IDevice;

  /** Accessor for device type */
  get deviceType(): IDeviceType {
    return this.device ? (this.device as any).deviceType : null;
  }

  /** Accessor for image URL */
  get imageUrl(): string | null {
    return this.deviceType ? this.deviceType.imageUrl : null;
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
