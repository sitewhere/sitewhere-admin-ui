<template>
  <base-dialog
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
        <metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  DialogComponent,
  DialogSection,
  BaseDialog,
  MetadataPanel
} from "sitewhere-ide-components";

import InvocationDetailFields from "./InvocationDetailFields.vue";
import ScheduleChooserSection from "./ScheduleChooserSection.vue";
import { IDeviceCommandInvocation, IUser } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    InvocationDetailFields,
    ScheduleChooserSection,
    MetadataPanel
  }
})
export default class InvocationDialog extends DialogComponent<
  IDeviceCommandInvocation
> {
  @Prop() readonly assignmentToken!: string;
  @Prop() readonly deviceTypeToken!: string;
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: InvocationDetailFields;
  @Ref() readonly schedule!: ScheduleChooserSection;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceCommand;
  }

  // Generate payload from UI.
  generatePayload() {
    const payload: any = {};
    Object.assign(
      payload,
      this.details.save(),
      this.schedule.save(),
      this.metadata.save(),
      {
        initiator: "REST",
        initiatorId: this.user.username,
        target: "Assignment",
        targetId: this.assignmentToken
      }
    );
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.schedule) {
      this.schedule.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: IDeviceCommandInvocation) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.schedule) {
      this.schedule.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.schedule.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }

  // Get logged in user.
  get user(): IUser {
    return this.$store.getters.user;
  }
}
</script>
