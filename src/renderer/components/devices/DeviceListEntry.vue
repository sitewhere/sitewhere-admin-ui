<template>
  <sw-list-entry style="min-height: 130px">
    <v-container @click="onOpenDevice">
      <v-layout row>
        <v-flex xs3>
          <branding-image :style="logoStyle" :entity="deviceType" iconSize="4x" />
        </v-flex>
        <v-flex xs8>
          <div>
            <div class="title ellipsis mb-2">{{ device.deviceType.name }}</div>
            <div class="subheading mb-2">{{ device.token }}</div>
            <div class="dvcomm">{{ device.comments }}</div>
          </div>
        </v-flex>
        <v-flex xs1>
          <div
            v-if="hasAssignedAsset"
            class="device-asset"
            :style="backgroundImageStyle(assignment.assetImageUrl)"
          ></div>
          <div v-else-if="!assignment" class="device-assign-button">
            <v-tooltip top>
              <v-btn dark icon class="blue pa-0 ma-0" @click.stop="onAssignDevice" slot="activator">
                <v-icon>link</v-icon>
              </v-btn>
              <span>Assign Device</span>
            </v-tooltip>
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

import { IStyle, styleForAssignmentStatus } from "../common/Style";
import { IDevice, IDeviceType, IDeviceAssignment } from "sitewhere-rest-api";

@Component({
  components: {
    BrandingImage
  }
})
export default class DeviceListEntry extends Vue {
  @Prop() readonly device!: IDevice;

  get deviceType(): IDeviceType {
    return (this.device as any).deviceType;
  }

  get assignment(): IDeviceAssignment {
    return (this.device as any).assignment;
  }

  get styleForStatus(): IStyle {
    return styleForAssignmentStatus(this.assignment);
  }

  get hasAssignedAsset() {
    return this.assignment && this.assignment.assetId;
  }

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "110px",
      width: "110px"
    };
  }

  // Called when a device is clicked.
  onOpenDevice() {
    this.$emit("open", this.device);
  }

  // Open device assignment dialog.
  onAssignDevice() {
    this.$emit("assign", this.device);
  }
}
</script>

<style scoped>
.dvcomm {
  height: 25px;
  overflow-y: hidden;
}
</style>
