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
        <batch-command-detail-fields :deviceTypeToken="deviceTypeToken" ref="details" />
      </v-tab-item>
      <v-tab-item key="schedule">
        <batch-command-schedule-fields ref="schedule" />
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

import BatchCommandDetailFields from "./BatchCommandDetailFields.vue";
import BatchCommandScheduleFields from "./BatchCommandScheduleFields.vue";
import {
  IDeviceAssignmentSearchCriteria,
  IBatchOperation
} from "sitewhere-rest-api";

@Component({
  components: {
    BatchCommandDetailFields,
    BatchCommandScheduleFields
  }
})
export default class InvocationByAssignmentCriteriaDialog extends DialogComponent<
  IBatchOperation
> {
  @Prop() readonly filter!: IDeviceAssignmentSearchCriteria;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: BatchCommandDetailFields;
    schedule: BatchCommandScheduleFields;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceCommand;
  }

  /** Get device type token */
  get deviceTypeToken(): string | null {
    return this.filter.deviceTypeTokens &&
      this.filter.deviceTypeTokens.length > 0
      ? this.filter.deviceTypeTokens[0]
      : null;
  }

  /** Generate payload from UI */
  generatePayload() {
    let payload: any = {};
    if (
      this.filter.deviceTypeTokens &&
      this.filter.deviceTypeTokens.length > 0
    ) {
      payload.deviceTypeToken = this.filter.deviceTypeTokens[0];
    }
    if (this.filter.customerTokens) {
      payload.customerTokens = this.filter.customerTokens;
    }
    if (this.filter.areaTokens) {
      payload.areaTokens = this.filter.areaTokens;
    }
    if (this.filter.assetTokens) {
      payload.assetTokens = this.filter.assetTokens;
    }

    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.schedule.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  /** Reset dialog contents */
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

  /** Load dialog from a given payload */
  load(payload: IBatchOperation) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.schedule) {
      this.$refs.schedule.load(payload);
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.load(payload);
    }
  }

  /** Called after create button is clicked */
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
}
</script>
