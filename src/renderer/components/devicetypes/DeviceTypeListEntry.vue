<template>
  <sw-list-entry style="min-height: 150px">
    <v-container @click="onOpenDeviceType">
      <v-layout row>
        <v-flex xs3>
          <branding-image :style="logoStyle" :entity="deviceType" iconSize="4x" />
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mt-1 mb-2">{{ deviceType.name }}</div>
            <div class="dtdesc">{{ deviceType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </sw-list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import BrandingImage from "../common/BrandingImage.vue";

import { IStyle } from "../common/Style";
import { IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    BrandingImage
  }
})
export default class DeviceTypeListEntry extends Vue {
  @Prop() readonly deviceType!: IDeviceType;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "110px",
      width: "110px"
    };
  }

  // Called when a device type is clicked.
  onOpenDeviceType() {
    this.$emit("deviceTypeOpened", this.deviceType);
  }
}
</script>

<style scoped>
.dtdesc {
  height: 60px;
  overflow-y: hidden;
}
</style>
