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
      <v-tab key="roles">Roles</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <device-group-element-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="roles">
        <device-group-element-role-fields ref="roles" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  DialogComponent,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import DeviceGroupElementDetailFields from "./DeviceGroupElementDetailFields.vue";
import DeviceGroupElementRoleFields from "./DeviceGroupElementRoleFields.vue";
import { IDeviceGroupElement } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceGroupElementDetailFields,
    DeviceGroupElementRoleFields
  }
})
export default class DeviceGroupElementDialog extends DialogComponent<
  IDeviceGroupElement
> {
  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DeviceGroupElementDetailFields;
    roles: DeviceGroupElementRoleFields;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceGroup;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(payload, this.$refs.details.save(), this.$refs.roles.save());
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.roles) {
      this.$refs.roles.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IDeviceGroupElement) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.roles) {
      this.$refs.roles.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    if (!this.$refs.roles.validate()) {
      this.$refs.dialog.setActiveTab(1);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
