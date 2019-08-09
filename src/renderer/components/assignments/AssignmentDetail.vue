<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading assignment ..."
    :loaded="loaded"
    :record="assignment"
  >
    <template slot="header">
      <assignment-detail-header :record="assignment" @statusUpdated="refresh" />
    </template>
    <template slot="tabs">
      <v-tab key="locations">Locations</v-tab>
      <v-tab key="measurements">Measurements</v-tab>
      <v-tab key="alerts">Alerts</v-tab>
      <v-tab key="invocations">Command Invocations</v-tab>
      <v-tab key="responses">Command Responses</v-tab>
    </template>
    <template slot="tab-items">
      <assignment-location-events tabkey="locations" :token="token" />
      <assignment-measurement-events tabkey="measurements" :token="token" />
      <assignment-alert-events tabkey="alerts" :token="token" />
      <assignment-invocation-events tabkey="invocations" :token="token" />
      <assignment-response-events tabkey="responses" :token="token" />
    </template>
    <template slot="dialogs">
      <invocation-create-dialog
        ref="invoke"
        :assignmentToken="token"
        :deviceTypeToken="deviceTypeToken"
        @invocationAdded="onInvocationAdded"
      />
      <assignment-delete-dialog
        ref="delete"
        :token="token"
        @assignmentDeleted="onAssignmentDeleted"
      />
    </template>
    <template slot="actions">
      <device-command-button tooltip="Invoke Command" @action="onAddCommandInvocation" />
      <emulator-button tooltip="Device Emulator" @action="onOpenEmulator" />
      <delete-button tooltip="Delete Assignment" @action="onAssignmentDelete" />
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
import DeviceCommandButton from "../common/navbuttons/DeviceCommandButton.vue";
import EmulatorButton from "../common/navbuttons/EmulatorButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getDeviceAssignment } from "../../rest/sitewhere-device-assignments-api";
import {
  IDevice,
  IDeviceType,
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
    InvocationCreateDialog,
    DeviceCommandButton,
    EmulatorButton,
    DeleteButton
  }
})
export default class AssignmentDetail extends DetailComponent<
  IDeviceAssignment
> {
  // References.
  $refs!: Refs<{
    edit: null;
    delete: null;
    invoke: InvocationCreateDialog;
  }>;

  /** Record as assignment */
  get assignment(): IDeviceAssignment | null {
    return this.record;
  }

  /** Device for assignment */
  get device(): IDevice | null {
    return this.assignment ? (this.assignment as any).device : null;
  }

  /** Device type for assignment */
  get deviceType(): IDeviceType | null {
    return this.device ? (this.device as any).deviceType : null;
  }

  /** Device type token for assignment */
  get deviceTypeToken(): string | null {
    return this.deviceType ? this.deviceType.token : null;
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

  onAssignmentDelete() {
    console.log("Would be deleting assignment");
  }

  // Called when site is deleted.
  onAssignmentDeleted() {
    routeTo(this, "/areas");
  }

  /** Called to open assignment emulator */
  onOpenEmulator() {
    routeTo(this, "/assignments/" + this.$data.token + "/emulator");
  }

  /** Called to create command invocation */
  onAddCommandInvocation() {
    this.$refs.invoke.open();
  }

  /** Called after invocation is added */
  onInvocationAdded() {
    console.log("Invocation added");
  }
}
</script>
