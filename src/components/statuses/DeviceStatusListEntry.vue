<template>
  <list-entry>
    <v-toolbar flat dark dense card :style="cardStyle">
      <font-awesome-icon :icon="icon" size="lg" />
      <v-toolbar-title :style="textStyle">{{ name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{on}">
          <v-icon :style="deleteStyle" @click="onEditStatus" v-on="on">{{ editIcon }}</v-icon>
        </template>
        <span>Edit Device Status</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{on}">
          <v-icon :style="deleteStyle" @click="onDeleteStatus" v-on="on">{{ deleteIcon }}</v-icon>
        </template>
        <span>Delete Device Status</span>
      </v-tooltip>
    </v-toolbar>
  </list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";

import { ListEntry } from "sitewhere-ide-components";

import { IDeviceStatus } from "sitewhere-rest-api";

@Component({ components: { ListEntry } })
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

  /** Icon for edit */
  get editIcon() {
    return NavigationIcon.Edit;
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
