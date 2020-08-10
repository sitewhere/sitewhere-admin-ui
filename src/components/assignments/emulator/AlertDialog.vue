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
    @tabSelected="onTabSelected"
  >
    <template slot="tabs">
      <v-tab key="details">Details</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" eager>
        <alert-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="metadata" eager>
        <metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  DialogComponent,
  DialogSection,
  BaseDialog,
  MetadataPanel
} from "sitewhere-ide-components";

import AlertDetailFields from "./AlertDetailFields.vue";
import { IDeviceAlert } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    AlertDetailFields,
    MetadataPanel
  }
})
export default class AlertDialog extends DialogComponent<IDeviceAlert> {
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: AlertDetailFields;
  @Ref() readonly metadata!: DialogSection;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Alert;
  }

  /** Generate payload from UI */
  generatePayload() {
    const payload: any = {};
    Object.assign(payload, this.details.save(), this.metadata.save());
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.metadata) {
      this.metadata.reset();
    }
    this.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: IDeviceAlert) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.metadata) {
      this.metadata.load(payload);
    }
  }

  /** Called when tab selection is updated */
  onTabSelected(updated: number) {
    console.log(updated);
  }

  /** Called after create button is clicked */
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
