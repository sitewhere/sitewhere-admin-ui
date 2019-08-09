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
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <device-status-detail-fields ref="details" />
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

import DeviceStatusDetailFields from "./DeviceStatusDetailFields.vue";
import { IDeviceStatus } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceStatusDetailFields
  }
})
export default class DeviceStatusDialog extends DialogComponent<IDeviceStatus> {
  @Prop() readonly deviceTypeToken!: string;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DeviceStatusDetailFields;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceStatus;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {
      deviceTypeToken: this.deviceTypeToken
    };
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IDeviceStatus) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
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

    var payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>

<style scoped>
</style>
