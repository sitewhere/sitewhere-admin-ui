<template>
  <div>
    <div v-if="deviceType">
      <v-card-text>
        {{ chosenText }}
      </v-card-text>
      <v-list two-line>
        <v-list-tile avatar :key="deviceType.token">
          <v-list-tile-avatar>
            <img :src="deviceType.imageUrl">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="deviceType.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="deviceType.description">
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple @click.stop="onDeviceTypeRemoved(true)">
              <v-icon class="grey--text">remove_circle</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else>
      <v-card-text>
        {{ notChosenText }}
      </v-card-text>
      <v-list v-if="deviceTypes" class="device-type-list" two-line>
        <template v-for="deviceType in deviceTypes">
          <v-list-tile avatar :key="deviceType.token"
            @click.stop="onDeviceTypeChosen(deviceType, true)">
            <v-list-tile-avatar>
              <img :src="deviceType.imageUrl">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="deviceType.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="deviceType.description">
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import Lodash from "lodash";
import { _listDeviceTypes } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({
    deviceType: null,
    deviceTypes: []
  }),

  props: ["value", "chosenText", "notChosenText"],

  // Initially load list of all sites.
  created: function() {
    var component = this;

    _listDeviceTypes(this.$store, false, true)
      .then(function(response) {
        component.deviceTypes = response.data.results;
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
    // Called when device type token is updated.
    onValueUpdated: function(token) {
      let deviceType = Lodash.find(this.deviceTypes, { token: token });
      if (deviceType) {
        this.onDeviceTypeChosen(deviceType, false);
      } else {
        this.onDeviceTypeRemoved(false);
      }
    },
    // Called when a device type is chosen.
    onDeviceTypeChosen: function(deviceType, emit) {
      this.$data.deviceType = deviceType;
      if (emit) {
        this.$emit("input", deviceType.token);
        this.$emit("deviceTypeUpdated", deviceType);
      }
    },
    // Allow another device type to be chosen.
    onDeviceTypeRemoved: function(emit) {
      this.$data.deviceType = null;
      if (emit) {
        this.$emit("input", null);
        this.$emit("deviceTypeUpdated", null);
      }
    }
  }
};
</script>

<style scoped>
.device-type-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
