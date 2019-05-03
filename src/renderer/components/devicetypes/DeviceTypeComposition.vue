<template>
  <sw-content-tab :tabkey="tabkey" :loaded="true" loadingMessage="Loading...">
    <device-unit-panel
      :deviceUnit="deviceElementSchema"
      @addDeviceUnit="onAddDeviceUnit"
      @deleteDeviceUnit="onDeleteDeviceUnit"
      @addDeviceSlot="onAddDeviceSlot"
      @deleteDeviceSlot="onDeleteDeviceSlot"
    />
  </sw-content-tab>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import DeviceUnitPanel from "./DeviceUnitPanel.vue";

import { IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceUnitPanel
  }
})
export default class DeviceTypeComposition extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly deviceType!: IDeviceType;

  /** Device element schema */
  get deviceElementSchema() {
    return this.deviceType ? this.deviceType.deviceElementSchema : null;
  }

  /** Handle event for adding a device unit */
  onAddDeviceUnit(parentUnitPath: string) {
    console.log("add", parentUnitPath);
  }

  /** Handle event for deleting a device unit */
  onDeleteDeviceUnit(unitPath: string) {
    console.log("delete", unitPath);
  }

  /** Handle event for adding a device slot */
  onAddDeviceSlot(unitPath: string) {
    console.log("add slot", unitPath);
  }

  /** Handle event for deleting a device unit */
  onDeleteDeviceSlot(unitPath: string, slotPath: string) {
    console.log("delete slot", unitPath, slotPath);
  }
}
</script>

<style scoped>
</style>
