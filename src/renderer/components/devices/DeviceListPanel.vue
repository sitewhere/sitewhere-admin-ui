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
        :style="backgroundImageStyle(device.assignment.assetImageUrl)"
      ></div>
      <div v-else-if="!device.assignment" class="device-assign-button">
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

<script>
import Style from "../common/Style";

import { formatDate } from "../common/Utils";

export default {
  data: function() {
    return {};
  },

  components: {},

  props: ["device"],

  computed: {
    styleForStatus: function() {
      return Style.styleForAssignmentStatus(this.device.assignment);
    },
    hasAssignedAsset: function() {
      return this.device.assignment && this.device.assignment.assetId;
    }
  },

  methods: {
    styleForDevice: function() {
      let style = {};
      style["background-color"] = this.device.assignment ? "#fff" : "#f0f0ff";
      style["border"] =
        "1px solid " + (this.device.assignment ? "#fff" : "#dde");
      return style;
    },
    // Create background image style.
    backgroundImageStyle: function(image) {
      return {
        "background-image": "url(" + image + ")",
        "background-size": "contain",
        "background-repeat": "no-repeat",
        "background-position": "50% 50%"
      };
    },

    // Called when a device is clicked.
    onOpenDevice: function() {
      this.$emit("deviceOpened", this.device);
    },

    // Open device assignment dialog.
    onAssignDevice: function() {
      this.$emit("assignDevice", this.device);
    }
  }
};
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
