<template>
  <sw-list-entry>
    <v-toolbar flat dark dense card @click="onEditStatus" :style="cardStyle">
      <font-awesome-icon :icon="icon" size="lg" />
      <v-toolbar-title :style="textStyle">{{ name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <v-icon :style="deleteStyle" @click="onDeleteStatus" slot="activator">{{ deleteIcon }}</v-icon>
        <span>Delete Device Status</span>
      </v-tooltip>
    </v-toolbar>
  </sw-list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import { IDeviceStatus } from "sitewhere-rest-api";
import { NavigationIcon } from "../../libraries/constants";

@Component({})
export default class DeviceTypeListEntry extends Vue {
  @Prop() readonly deviceStatus!: IDeviceStatus;

  /** Icon for status */
  get icon() {
    return this.deviceStatus ? this.deviceStatus.icon : null;
  }

  /** Icon for delete */
  get deleteIcon() {
    return NavigationIcon.Delete;
  }

  /** Name for status */
  get name() {
    return this.deviceStatus ? this.deviceStatus.name : null;
  }

  /** Card style for status */
  get cardStyle() {
    return {
      "background-color": this.deviceStatus.backgroundColor,
      border: "1px solid " + this.deviceStatus.borderColor
    };
  }

  /** Text style for status */
  get textStyle() {
    return {
      color: this.deviceStatus.foregroundColor
    };
  }

  /** Text style for delete icon */
  get deleteStyle() {
    return {
      color: this.deviceStatus.foregroundColor,
      opacity: 0.5
    };
  }

  // Called after status has been deleted.
  onEditStatus() {
    this.$emit("edit", this.deviceStatus);
  }

  // Called after status has been updated.
  onDeleteStatus() {
    this.$emit("delete", this.deviceStatus);
  }
}
</script>
