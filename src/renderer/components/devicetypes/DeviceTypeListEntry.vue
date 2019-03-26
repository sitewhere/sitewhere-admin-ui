<template>
  <list-entry class="pa-2">
    <v-card-text class="deviceType" @click="onOpenDeviceType">
      <div class="type-logo" :style="logoStyle"></div>
      <div class="type-name">{{deviceType.name}}</div>
      <div class="type-desc">{{deviceType.description}}</div>
    </v-card-text>
  </list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import ListEntry from "../common/ListEntry.vue";
import { IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    ListEntry
  }
})
export default class DeviceTypeListEntry extends Vue {
  @Prop() readonly deviceType!: IDeviceType;

  // Compute style of logo.
  get logoStyle() {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.deviceType.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%",
      border: "1px solid #eee"
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
