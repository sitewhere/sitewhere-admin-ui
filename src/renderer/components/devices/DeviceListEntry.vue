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
          <div>
            <v-tooltip top>
              <v-btn dark icon class="blue pa-0 ma-0" @click.stop="onAssignDevice" slot="activator">
                <v-icon>link</v-icon>
              </v-btn>
              <span>Create New Assignment</span>
            </v-tooltip>
          </div>
          <div v-if="hasAssignments">
            <v-btn :disabled="true" icon small class="mt-3 ml-1">
              <v-avatar size="40">
                <img :src="firstAssignment.assetImageUrl" />
              </v-avatar>
            </v-btn>
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

  get assignments(): IDeviceAssignment[] {
    return (this.device as any).activeDeviceAssignments;
  }

  get hasAssignments() {
    return this.assignments && this.assignments.length > 0;
  }

  get firstAssignment(): IDeviceAssignment | null {
    return this.hasAssignments ? this.assignments[0] : null;
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
