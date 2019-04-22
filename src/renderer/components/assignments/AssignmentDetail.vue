<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading assignment ..."
    :loaded="loaded"
    :record="assignment"
  >
    <template slot="header">
      <assignment-detail-header :record="assignment"/>
    </template>
    <template slot="tabs">
      <v-tab key="locations">Locations</v-tab>
      <v-tab key="measurements">Measurements</v-tab>
      <v-tab key="alerts">Alerts</v-tab>
      <v-tab key="invocations">Command Invocations</v-tab>
      <v-tab key="responses">Command Responses</v-tab>
    </template>
    <template slot="tab-items">
      <assignment-location-events tabkey="locations" :token="token"/>
      <assignment-measurement-events tabkey="measurements" :token="token"/>
      <assignment-alert-events tabkey="alerts" :token="token"/>
      <assignment-invocation-events tabkey="invocations" :token="token"/>
      <assignment-response-events tabkey="responses" :token="token"/>
    </template>
    <template slot="dialogs">
      <invocation-create-dialog
        :token="token"
        @invocationAdded="onInvocationAdded"
        :deviceType="assignment.device.deviceType"
      />
      <assignment-delete-dialog
        ref="delete"
        :token="token"
        @assignmentDeleted="onAssignmentDeleted"
      />
    </template>
    <template slot="actions">
      <sw-navigation-action-button
        icon="crosshairs"
        tooltip="Device Emulator"
        @action="onOpenEmulator"
      />
      <sw-navigation-action-button icon="times" tooltip="Delete Assignment" @action="onDelete"/>
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import AssignmentDetailHeader from "./AssignmentDetailHeader.vue";
import AssignmentLocationEvents from "./AssignmentLocationEvents.vue";
import AssignmentMeasurementEvents from "./AssignmentMeasurementEvents.vue";
import AssignmentAlertEvents from "./AssignmentAlertEvents.vue";
import AssignmentInvocationEvents from "./AssignmentInvocationEvents.vue";
import AssignmentResponseEvents from "./AssignmentResponseEvents.vue";
import AssignmentDeleteDialog from "./AssignmentDeleteDialog.vue";
import InvocationCreateDialog from "./InvocationCreateDialog.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getDeviceAssignment } from "../../rest/sitewhere-device-assignments-api";
import {
  IDeviceAssignment,
  IDeviceAssignmentResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentDetailHeader,
    AssignmentLocationEvents,
    AssignmentMeasurementEvents,
    AssignmentAlertEvents,
    AssignmentInvocationEvents,
    AssignmentResponseEvents,
    AssignmentDeleteDialog,
    InvocationCreateDialog
  }
})
export default class AssignmentDetail extends DetailComponent<
  IDeviceAssignment
> {
  // References.
  $refs!: Refs<{
    edit: null;
    delete: null;
  }>;

  /** Record as assignment */
  get assignment(): IDeviceAssignment | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceAssignment;
  }

  /** Get page title */
  get title(): string {
    return this.assignment ? this.assignment.token : "";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDeviceAssignment> {
    let format: IDeviceAssignmentResponseFormat = {
      includeDevice: true
    };
    return getDeviceAssignment(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(assignment: IDeviceAssignment) {
    var section: INavigationSection = {
      id: "assignments",
      title: "Assignments",
      icon: NavigationIcon.DeviceAssignment,
      route: "/admin/assignments/" + assignment.token,
      longTitle: "Manage Assignment: " + assignment.token
    };
    this.$store.commit("currentSection", section);
  }

  // Called when site is deleted.
  onAssignmentDeleted() {
    routeTo(this, "/areas");
  }

  // Called when emulator is opened.
  onOpenEmulator() {
    routeTo(this, "/assignments/" + this.$data.token + "/emulator");
  }
}
</script>

<style scoped>
</style>
