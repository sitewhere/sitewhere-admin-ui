<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    title="Filter Device List"
    width="600"
    :loaded="loaded"
    :visible="dialogVisible"
    createLabel="Filter"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <dialog-header>Choose criteria for filtering which devices are shown.</dialog-header>
    <template slot="tabs">
      <v-tab key="devicetype">Device Type</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="devicetype">
        <device-list-filter-device-type-fields ref="devicetype" />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import {
  DialogComponent,
  BaseDialog,
  DialogHeader
} from "sitewhere-ide-components";

import DeviceListFilterDeviceTypeFields from "./DeviceListFilterDeviceTypeFields.vue";

import { IDeviceSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    BaseDialog,
    DialogHeader,
    DeviceListFilterDeviceTypeFields
  }
})
export default class DeviceListFilterDialog extends DialogComponent<
  IDeviceSearchCriteria
> {
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly devicetype!: DeviceListFilterDeviceTypeFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  /** Generate payload from UI */
  generatePayload() {
    const payload: any = {};
    Object.assign(payload, this.devicetype.save());
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.devicetype) {
      this.devicetype.reset();
    }
    if (this.dialog) {
      this.dialog.setActiveTab(0);
    }
  }

  /** Load dialog from a given payload */
  load(payload: IDeviceSearchCriteria) {
    this.reset();
    if (this.devicetype) {
      this.devicetype.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked() {
    if (!this.devicetype.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
