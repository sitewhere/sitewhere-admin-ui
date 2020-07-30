<template>
  <v-card
    flat
    outlined
    :hover="!headerMode"
    :style="styleForStatus"
    class="assn-root"
    @click="onOpenAssignment"
  >
    <assignment-associations class="assn-asset" :assignment="assignment" />
    <div class="assn-separator2"></div>
    <div class="assn-assigned-label caption font-weight-bold">Assigned:</div>
    <div class="assn-assigned-value caption">{{ formatDate(assignment.activeDate) }}</div>
    <div class="assn-released-label caption font-weight-bold">Released:</div>
    <div class="assn-released-value caption">{{ formatDate(assignment.releasedDate) }}</div>
    <div class="assn-status-label caption font-weight-bold">Status:</div>
    <assignment-status-indicator class="assn-status-indicator" :assignment="assignment" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import AssignmentAssociations from "./AssignmentAssociations.vue";
import AssignmentStatusIndicator from "./AssignmentStatusIndicator.vue";

import Vue from "vue";

import { styleForAssignmentStatus } from "../common/Style";
import { formatDate } from "sitewhere-ide-common";
import { IDeviceAssignmentSummary } from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentAssociations,
    AssignmentStatusIndicator,
  },
})
export default class AssignmentListEntry extends Vue {
  @Prop() readonly assignment!: IDeviceAssignmentSummary;
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
  min-height: 100px;
  overflow-x: hidden;
}
.assn-asset {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 300px;
}
.assn-assigned-label {
  position: absolute;
  top: 6px;
  right: 180px;
  color: #333;
}
.assn-assigned-value {
  position: absolute;
  top: 6px;
  right: 30px;
  color: #333;
}
.assn-released-label {
  position: absolute;
  top: 35px;
  right: 180px;
  color: #333;
}
.assn-released-value {
  position: absolute;
  top: 35px;
  right: 30px;
  color: #333;
}
.assn-status-label {
  position: absolute;
  top: 64px;
  right: 180px;
  color: #333;
}
.assn-status-value {
  position: absolute;
  top: 64px;
  right: 30px;
  font-size: 12px;
}
.assn-separator2 {
  position: absolute;
  width: 10px;
  border-left: 1px solid #eee;
  top: 10px;
  bottom: 10px;
  right: 280px;
}
.assn-status-indicator {
  position: absolute;
  top: 64px;
  right: 30px;
  height: 20px;
  margin-top: -4px;
}
</style>
