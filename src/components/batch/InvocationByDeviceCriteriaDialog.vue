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
        <batch-command-detail-fields :deviceTypeToken="deviceTypeToken" ref="details" />
      </v-tab-item>
      <v-tab-item key="schedule">
        <batch-command-schedule-fields ref="schedule" />
      </v-tab-item>
      <v-tab-item key="metadata">
        <sw-metadata-panel ref="metadata" />
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
  BaseDialog
} from "sitewhere-ide-components";

import BatchCommandDetailFields from "./BatchCommandDetailFields.vue";
import BatchCommandScheduleFields from "./BatchCommandScheduleFields.vue";
import { IDeviceSearchCriteria, IBatchOperation } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    BatchCommandDetailFields,
    BatchCommandScheduleFields
  }
})
export default class InvocationByDeviceCriteriaDialog extends DialogComponent<
  IBatchOperation
> {
  @Prop() readonly filter!: IDeviceSearchCriteria;
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: BatchCommandDetailFields;
  @Ref() readonly schedule!: BatchCommandScheduleFields;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceCommand;
  }

  /** Get device type token */
  get deviceTypeToken(): string | undefined {
    return this.filter.deviceTypeToken;
  }

  /** Generate payload from UI */
  generatePayload() {
    const payload: any = { deviceTypeToken: this.filter.deviceTypeToken };
    Object.assign(
      payload,
      this.details.save(),
      this.schedule.save(),
      this.metadata.save()
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
  load(payload: IBatchOperation) {
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
}
</script>
