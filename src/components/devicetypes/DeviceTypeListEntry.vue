<template>
  <list-entry style="min-height: 150px">
    <v-container @click="onOpenDeviceType">
      <v-layout row>
        <v-flex xs3>
          <branding-image :style="logoStyle" :entity="deviceType" iconSize="4x" />
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mb-1">{{ deviceType.name }}</div>
            <div class="caption dtdesc">{{ deviceType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { ListEntry } from "sitewhere-ide-components";
import BrandingImage from "../common/BrandingImage.vue";

import { IStyle } from "../common/Style";
import { IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    ListEntry,
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
  height: 80px;
  overflow-y: hidden;
}
</style>
