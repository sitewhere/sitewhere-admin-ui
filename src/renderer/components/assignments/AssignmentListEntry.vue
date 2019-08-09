<template>
  <v-card :hover="!headerMode" class="white">
    <v-card-text @click="onOpenAssignment" :style="styleForStatus" class="assn-root">
      <asset-mini-panel class="assn-asset" :assignment="assignment"></asset-mini-panel>
      <div class="assn-separator1"></div>
      <device-mini-panel class="assn-device" :device="assignment.device"></device-mini-panel>
      <div class="assn-separator2"></div>
      <div class="assn-assigned-label">Assigned:</div>
      <div class="assn-assigned-value">{{ formatDate(assignment.activeDate) }}</div>
      <div class="assn-released-label">Released:</div>
      <div class="assn-released-value">{{ formatDate(assignment.releasedDate) }}</div>
      <div class="assn-status-label">Status:</div>
      <assignment-status-indicator class="assn-status-indicator" :assignment="assignment"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import { styleForAssignmentStatus } from "../common/Style";
import AssetMiniPanel from "./AssetMiniPanel.vue";
import DeviceMiniPanel from "../devices/DeviceMiniPanel.vue";
import AssignmentStatusIndicator from "./AssignmentStatusIndicator.vue";

import Vue from "vue";

import { formatDate } from "../common/Utils";
import { IDeviceAssignment } from "sitewhere-rest-api";

@Component({
  components: {
    AssetMiniPanel,
    DeviceMiniPanel,
    AssignmentStatusIndicator
  }
})
export default class AssignmentListEntry extends Vue {
  @Prop() readonly assignment!: IDeviceAssignment;
  @Prop() readonly headerMode!: boolean;

  get styleForStatus() {
    return styleForAssignmentStatus(this.assignment);
  }

  // Fire event to have parent refresh content.
  refresh() {
    this.$emit("refresh");
  }

  // Called when assignment is clicked.
  onOpenAssignment() {
    this.$emit("assignmentOpened", this.assignment);
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>

<style scoped>
.assn-root {
  position: relative;
  min-height: 90px;
  overflow-x: hidden;
}
.assn-asset {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
.assn-device {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 320px;
  width: 330px;
}
.assn-assigned-label {
  position: absolute;
  top: 6px;
  left: 665px;
  font-size: 12px;
  color: #333;
  font-weight: 700;
  white-space: nowrap;
}
.assn-assigned-value {
  position: absolute;
  top: 6px;
  left: 745px;
  font-size: 12px;
  color: #333;
  white-space: nowrap;
}
.assn-released-label {
  position: absolute;
  top: 32px;
  left: 665px;
  font-size: 12px;
  color: #333;
  font-weight: 700;
  white-space: nowrap;
}
.assn-released-value {
  position: absolute;
  top: 32px;
  left: 745px;
  font-size: 12px;
  color: #333;
  white-space: nowrap;
}
.assn-status-label {
  position: absolute;
  top: 58px;
  left: 665px;
  font-size: 12px;
  color: #333;
  font-weight: 700;
  white-space: nowrap;
}
.assn-status-value {
  position: absolute;
  top: 58px;
  left: 745px;
  font-size: 12px;
}
.assn-separator1 {
  position: absolute;
  width: 10px;
  border-left: 1px solid #ddd;
  top: 10px;
  bottom: 10px;
  left: 310px;
}
.assn-separator2 {
  position: absolute;
  width: 10px;
  border-left: 1px solid #ddd;
  top: 10px;
  bottom: 10px;
  left: 645px;
}
.assn-status-indicator {
  position: absolute;
  top: 58px;
  left: 745px;
  height: 20px;
  margin-top: -4px;
}
</style>
