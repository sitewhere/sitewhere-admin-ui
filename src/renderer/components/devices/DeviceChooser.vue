<template>
  <div v-if="device">
    <v-card-text class="subheading">{{ chosenText }}</v-card-text>
    <v-list two-line>
      <v-list-tile avatar :key="device.token">
        <v-list-tile-avatar>
          <img :src="device.deviceType.imageUrl">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="device.token"></v-list-tile-title>
          <v-list-tile-sub-title v-html="device.comments"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple @click.stop="onDeviceRemoved(true)">
            <v-icon class="grey--text">remove_circle</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
  <div v-else>
    <v-card-text class="subheading">{{ notChosenText }}</v-card-text>
    <v-list v-if="devices" class="result-list" two-line>
      <template v-for="device in devices">
        <v-list-tile avatar :key="device.token" @click.stop="onDeviceChosen(device, true)">
          <v-list-tile-avatar>
            <img :src="device.deviceType.imageUrl">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="device.token"></v-list-tile-title>
            <v-list-tile-sub-title v-html="device.comments"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import Lodash from "lodash";

import { pagingForAllResults } from "../common/Utils";
import { listDevices } from "../../rest/sitewhere-devices-api";

export default {
  data: () => ({
    device: null,
    devices: []
  }),

  props: ["value", "chosenText", "notChosenText"],

  // Initially load list of all devices.
  created: function() {
    var component = this;

    // Search options.
    let options = {};
    options.includeDeviceType = true;

    let paging = pagingForAllResults();
    listDevices(this.$store, options, paging)
      .then(function(response) {
        component.devices = response.data.results;
        if (component.value) {
          component.onValueUpdated(component.value);
        }
      })
      .catch(function(e) {});
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        this.onValueUpdated(newVal);
      }
    }
  },

  methods: {
    // Called when token is updated.
    onValueUpdated: function(token) {
      let device = Lodash.find(this.devices, { token: token });
      if (device) {
        this.onDeviceChosen(device, false);
      } else {
        this.onDeviceRemoved(false);
      }
    },
    // Called when a device is chosen.
    onDeviceChosen: function(device, emit) {
      this.$data.device = device;
      if (emit) {
        this.$emit("input", device.token);
        this.$emit("deviceUpdated", device);
      }
    },
    // Allow another device to be chosen.
    onDeviceRemoved: function(emit) {
      this.$data.device = null;
      if (emit) {
        this.$emit("input", null);
        this.$emit("deviceUpdated", null);
      }
    }
  }
};
</script>

<style scoped>
.result-list {
  border: 1px solid #eee;
  max-height: 300px;
  overflow-y: auto;
}
</style>
