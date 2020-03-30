<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Batch Operation Manager Settings"
    width="500"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="manager">Manager</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="manager">
        <batch-operation-manager-fields ref="manager" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, DialogComponent, Refs, Prop } from "sitewhere-ide-common";
import { IBatchOperationManagerConfiguration } from "sitewhere-configuration-model";
import { MicroserviceIcon } from "../../../../../libraries/constants";

import BatchOperationManagerFields from "./BatchOperationManagerFields.vue";

@Component({
  components: { BatchOperationManagerFields }
})
export default class BatchOperationManagerDialog extends DialogComponent<
  IBatchOperationManagerConfiguration
> {
  // References.
  $refs!: Refs<{
    dialog: any;
    manager: BatchOperationManagerFields;
  }>;

  /** Get icon for dialog */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.BatchOperations;
  }

  /** Generate payload from UI */
  generatePayload() {
    let payload: any = {};
    Object.assign(payload, this.$refs.manager.save());

    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.$refs.manager) {
      this.$refs.manager.reset();
    }
  }

  /** Load dialog from a given configuration */
  load(config: IBatchOperationManagerConfiguration) {
    this.reset();
    if (this.$refs.manager) {
      this.$refs.manager.load(config);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    if (!this.$refs.manager.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("update", payload);
    this.closeDialog();
  }
}
</script>
