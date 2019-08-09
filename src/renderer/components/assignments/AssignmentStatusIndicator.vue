<template>
  <span>
    <v-icon small :color="colorForStatus">{{iconForStatus}}</v-icon>
    {{nameForStatus}}
  </span>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import Vue from "vue";

import { IDeviceAssignment, DeviceAssignmentStatus } from "sitewhere-rest-api";

@Component({})
export default class AssignmentStatusIndicator extends Vue {
  @Prop() readonly assignment!: IDeviceAssignment;

  /** Get icon for assignment status */
  get iconForStatus(): string {
    return getIconForStatus(this.assignment.status);
  }

  /** Get color for assignment status */
  get colorForStatus(): string {
    return getColorForStatus(this.assignment.status);
  }

  /** Get name for assignment status */
  get nameForStatus(): string {
    return getNameForStatus(this.assignment.status);
  }
}

/** Get icon value for an assignment status */
export function getIconForStatus(status?: DeviceAssignmentStatus) {
  if (status) {
    switch (status) {
      case DeviceAssignmentStatus.Active:
        return "check_circle";
      case DeviceAssignmentStatus.Missing:
        return "warning";
      case DeviceAssignmentStatus.Released:
        return "block";
    }
  }
  return "question";
}

/** Get color value for an assignment status */
export function getColorForStatus(status?: DeviceAssignmentStatus) {
  if (status) {
    switch (status) {
      case DeviceAssignmentStatus.Active:
        return "#090";
      case DeviceAssignmentStatus.Missing:
        return "#900";
      case DeviceAssignmentStatus.Released:
        return "#ccc";
    }
  }
  return "#ccc";
}

/** Get name for an assignment status */
export function getNameForStatus(status?: DeviceAssignmentStatus) {
  if (status) {
    switch (status) {
      case DeviceAssignmentStatus.Active:
        return "Active";
      case DeviceAssignmentStatus.Missing:
        return "Missing";
      case DeviceAssignmentStatus.Released:
        return "Released";
    }
  }
  return "Unknown Status";
}
</script>
