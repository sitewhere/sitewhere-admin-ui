<template>
  <v-card flat hover class="pa-2" :style="styleForDevice()">
    <v-card-text @click="onOpenDevice" class="device-root">
      <div class="device-image" :style="backgroundImageStyle(device.deviceType.imageUrl)"></div>
      <div class="title device-type ellipsis">{{ device.deviceType.name }}</div>
      <div class="subheading device-token ellipsis">{{ device.token }}</div>
      <div class="device-comments ellipsis">{{ device.comments }}</div>
      <div
        v-if="hasAssignedAsset"
        class="device-asset"
        :style="backgroundImageStyle(assignment.assetImageUrl)"
      ></div>
      <div v-else-if="!assignment" class="device-assign-button">
        <v-tooltip top>
          <v-btn dark icon class="blue ml-0" @click.stop="onAssignDevice" slot="activator">
            <font-awesome-icon icon="tag" size="lg"/>
          </v-btn>
          <span>Assign Device</span>
        </v-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { IStyle, styleForAssignmentStatus } from "../common/Style";
import { IDevice } from "sitewhere-rest-api/dist/model/devices-model";
import { IDeviceAssignment } from "sitewhere-rest-api/dist/model/device-assignments-model";

@Component({})
export default class DeviceListEntry extends Vue {
  @Prop() readonly device!: IDevice;

  get assignment(): IDeviceAssignment {
    return (this.device as any).assignment;
  }

  get styleForStatus(): IStyle {
    return styleForAssignmentStatus(this.assignment);
  }

  get hasAssignedAsset() {
    return this.assignment && this.assignment.assetId;
  }

  styleForDevice() {
    let style: IStyle = {};
    style["background-color"] = this.assignment ? "#fff" : "#f0f0ff";
    style["border"] = "1px solid " + (this.assignment ? "#fff" : "#dde");
    return style;
  }

  // Create background image style.
  backgroundImageStyle(image: string): IStyle {
    return {
      "background-image": "url(" + image + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }

  // Called when a device is clicked.
  onOpenDevice() {
    this.$emit("deviceOpened", this.device);
  }

  // Open device assignment dialog.
  onAssignDevice() {
    this.$emit("assignDevice", this.device);
  }
}
</script>

<style scoped>
.device-root {
  position: relative;
  min-height: 80px;
  overflow-x: hidden;
}
.device-image {
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 80px;
  background-color: #fff;
  border-right: 1px solid #eee;
}
.device-type {
  position: absolute;
  top: 0px;
  left: 110px;
  right: 10px;
}
.device-token {
  position: absolute;
  top: 30px;
  left: 110px;
  right: 10px;
  font-size: 14px;
  color: #333;
}
.device-comments {
  position: absolute;
  top: 60px;
  left: 110px;
  right: 10px;
  font-size: 12px;
  color: #333;
}
.device-asset {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #eee;
}
.device-assign-button {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
