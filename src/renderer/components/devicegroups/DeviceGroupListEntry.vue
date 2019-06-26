<template>
  <sw-list-entry class="pa-2">
    <v-card-text class="group" @click="onOpenDeviceGroup">
      <div class="group-image" :style="backgroundImageStyle"></div>
      <div class="group-name ellipsis title">{{ deviceGroup.name }}</div>
      <div class="group-token ellipsis subheading">{{ deviceGroup.token }}</div>
      <div class="group-description ellipsis">{{ deviceGroup.description }}</div>
      <div class="group-roles ellipsis">
        Roles:
        <strong>{{ rolesView }}</strong>
      </div>
    </v-card-text>
  </sw-list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import { IStyle } from "../common/Style";
import { IDeviceGroup } from "sitewhere-rest-api";

@Component({})
export default class DeviceGroupListEntry extends Vue {
  @Prop() readonly deviceGroup!: IDeviceGroup;

  get rolesView(): string {
    return this.deviceGroup.roles.join(", ");
  }

  // Create background image style.
  get backgroundImageStyle(): IStyle {
    return {
      "background-image": "url(" + this.deviceGroup.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }

  // Called when a device group is clicked.
  onOpenDeviceGroup() {
    this.$emit("deviceGroupOpened", this.deviceGroup);
  }
}
</script>

<style scoped>
.group {
  position: relative;
  min-height: 120px;
  overflow-x: hidden;
}
.group-image {
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 90px;
  background-color: #fff;
  padding-right: 10px;
  border-right: 1px solid #eee;
}
.group-name {
  position: absolute;
  top: 8px;
  left: 120px;
  right: 10px;
}
.group-token {
  position: absolute;
  top: 35px;
  left: 120px;
  right: 10px;
}
.group-description {
  position: absolute;
  top: 63px;
  left: 120px;
  right: 10px;
}
.group-roles {
  position: absolute;
  top: 90px;
  left: 120px;
  right: 10px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
