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
      <v-tab key="roles">Roles</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details" eager>
        <device-group-element-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="roles" eager>
        <device-group-element-role-fields ref="roles" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent, BaseDialog } from "sitewhere-ide-components";

import DeviceGroupElementDetailFields from "./DeviceGroupElementDetailFields.vue";
import DeviceGroupElementRoleFields from "./DeviceGroupElementRoleFields.vue";
import { IDeviceGroupElement } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    DeviceGroupElementDetailFields,
    DeviceGroupElementRoleFields
  }
})
export default class DeviceGroupElementDialog extends DialogComponent<
  IDeviceGroupElement
> {
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: DeviceGroupElementDetailFields;
  @Ref() readonly roles!: DeviceGroupElementRoleFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceGroup;
  }

  // Generate payload from UI.
  generatePayload() {
    const payload: any = {};
    Object.assign(payload, this.details.save(), this.roles.save());
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.roles) {
      this.roles.reset();
    }
    this.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: any) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.roles) {
      this.roles.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.roles.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
