<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="details">Details</v-tab>
      <v-tab key="schedule">Schedule</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <invocation-detail-fields
          :deviceTypeToken="deviceTypeToken"
          :assignmentToken="assignmentToken"
          ref="details"
        />
      </v-tab-item>
      <v-tab-item key="schedule">
        <schedule-chooser-section ref="schedule" />
      </v-tab-item>
      <v-tab-item key="metadata">
        <sw-metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import InvocationDetailFields from "./InvocationDetailFields.vue";
import ScheduleChooserSection from "./ScheduleChooserSection.vue";
import { IDeviceCommandInvocation, IUser } from "sitewhere-rest-api";

@Component({
  components: {
    InvocationDetailFields,
    ScheduleChooserSection
  }
})
export default class InvocationDialog extends DialogComponent<
  IDeviceCommandInvocation
> {
  @Prop() readonly assignmentToken!: string;
  @Prop() readonly deviceTypeToken!: string;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: InvocationDetailFields;
    schedule: ScheduleChooserSection;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceCommand;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.schedule.save(),
      this.$refs.metadata.save(),
      {
        initiator: "REST",
        initiatorId: this.user.username,
        target: "Assignment",
        targetId: this.assignmentToken
      }
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.schedule) {
      this.$refs.schedule.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IDeviceCommandInvocation) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.branding) {
      this.$refs.schedule.load(payload);
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    if (!this.$refs.schedule.validate()) {
      this.$refs.dialog.setActiveTab(1);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }

  // Get logged in user.
  get user(): IUser {
    return this.$store.getters.user;
  }
}
</script>
