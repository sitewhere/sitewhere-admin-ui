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
.deviceType {
  min-height: 122px;
  overflow-y: hidden;
}

.type-logo {
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  width: 100px;
}

.type-name {
  position: absolute;
  top: 5px;
  left: 158px;
  right: 10px;
  font-size: 22px;
  font-weight: 400;
  white-space: nowrap;
  overflow-x: hidden;
}

.type-desc {
  position: absolute;
  top: 42px;
  left: 160px;
  right: 10px;
  bottom: 10px;
  font-size: 14px;
  overflow-y: hidden;
}
</style>

<style scoped>
.dtdesc {
  height: 60px;
  overflow-y: hidden;
}
</style>
