<template>
  <div>
    <sw-confirm-dialog
      ref="dialog"
      buttonText="Update"
      title="Update Assignment Status"
      width="400"
      @confirmed="onExecuteAction"
    >
      <v-card-text>Are you sure you want to update the assignment status?</v-card-text>
    </sw-confirm-dialog>
    <span v-if="assignment.status === 'Released'">Released</span>
    <v-menu offset-y v-else-if="assignment.status === 'Active'">
      <v-tooltip left slot="activator">
        <v-btn small class="green darken-2 white--text pa-0 ma-0" slot="activator">Active</v-btn>
        <span>Update Status</span>
      </v-tooltip>
      <v-list>
        <v-list-tile
          @click.stop="confirmFirst(item.action)"
          v-for="item in statusActiveItems"
          :key="item.text"
        >
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu offset-y v-else-if="assignment.status === 'Missing'">
      <v-tooltip left slot="activator">
        <v-btn small class="red darken-2 white--text pa-0 ma-0" slot="activator">Missing</v-btn>
        <span>Update Status</span>
      </v-tooltip>
      <v-list>
        <v-list-tile
          @click.stop="confirmFirst(item.action)"
          v-for="item in statusMissingItems"
          :key="item.text"
        >
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Refs } from "sitewhere-ide-common";
import Vue from "vue";

import { AxiosResponse } from "axios";
import { IDeviceAssignment } from "sitewhere-rest-api";

import {
  releaseAssignment,
  missingAssignment
} from "../../rest/sitewhere-device-assignments-api";

@Component({})
export default class AssignmentStatusButton extends Vue {
  @Prop() readonly assignment!: IDeviceAssignment;

  // References.
  $refs!: Refs<{
    dialog: any;
  }>;

  action: () => any = function() {};
  statusActiveItems: { text: string; action: () => any }[] = [
    {
      text: "Release Assignment",
      action: this.onReleaseAssignment
    },
    {
      text: "Report Missing",
      action: this.onMissingAssignment
    }
  ];
  statusMissingItems: { text: string; action: () => any }[] = [
    {
      text: "Release Assignment",
      action: this.onReleaseAssignment
    }
  ];

  /** Store the action and open confirmation */
  confirmFirst(action: () => any) {
    this.action = action;
    this.$refs.dialog.open();
  }

  /** Executes action after confirmation */
  onExecuteAction() {
    this.action();
  }

  /** Called to mark an assignment as released */
  async onReleaseAssignment() {
    let response: AxiosResponse<IDeviceAssignment> = await releaseAssignment(
      this.$store,
      this.assignment.token
    );
    this.onStatusUpdated(response.data);
  }

  /** Called to mark an assignment as missing */
  async onMissingAssignment() {
    let response: AxiosResponse<IDeviceAssignment> = await missingAssignment(
      this.$store,
      this.assignment.token
    );
    this.onStatusUpdated(response.data);
  }

  /** Handle successful update */
  onStatusUpdated(result: any) {
    this.$emit("updated");
  }
}
</script>
