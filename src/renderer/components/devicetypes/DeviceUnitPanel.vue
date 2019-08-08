<template>
  <v-card v-if="deviceUnit != null" class="ma-3 elevation-0">
    <v-card-text class="pa-0">
      <v-toolbar v-if="deviceUnit.path == null" class="blue darken-2 white--text" dark dense>
        <v-toolbar-title class="namespace-title subheading">Device Element Schema</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon @click="onAddDeviceUnitLocal()">{{addIcon}}</v-icon>
          </template>
          <span>Add Device Unit</span>
        </v-tooltip>
      </v-toolbar>
      <v-toolbar v-else class="blue darken-2 white--text" dark dense>
        <v-toolbar-title class="namespace-title subheading">{{ deviceUnit.name }} ({{ fullPath }})</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" @click="onAddDeviceUnitLocal()">{{addIcon}}</v-icon>
          </template>
          <span>Add Device Unit</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon @click="onDeleteDeviceUnitLocal()">{{deleteIcon}}</v-icon>
          </template>
          <span>Delete Device Unit</span>
        </v-tooltip>
      </v-toolbar>
      <v-card>
        <v-card-text>
          <v-card>
            <v-toolbar class="grey lighten-3 black--text elevation-0" dark dense>
              <v-toolbar-title class="namespace-title subheading">Device Slots</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-icon @click="onAddDeviceSlotLocal()" light>{{addIcon}}</v-icon>
                </template>
                <span>Add Device Slot</span>
              </v-tooltip>
            </v-toolbar>
            <v-list class="pa-0" v-if="deviceUnit.deviceSlots.length > 0">
              <div v-for="(deviceSlot, index) in deviceUnit.deviceSlots" :key="deviceSlot.name">
                <v-divider v-if="index > 0" />
                <device-slot-list-entry
                  :unitPath="fullPath"
                  :deviceSlot="deviceSlot"
                  @deleteDeviceSlot="onDeleteDeviceSlotLocal(deviceSlot)"
                />
              </div>
            </v-list>
            <no-results-panel
              v-if="deviceUnit.deviceSlots.length === 0"
              text="No Slots Currently Configured"
              minHeight="60px"
              fontSize="16px"
              padding="20px"
            ></no-results-panel>
          </v-card>
        </v-card-text>
        <v-card-media
          class="elevation-0"
          v-for="(subUnit) in deviceUnit.deviceUnits"
          :key="subUnit.name"
        >
          <device-unit-panel
            :deviceUnit="subUnit"
            :basePath="fullPath"
            @addDeviceUnit="onAddDeviceUnit"
            @deleteDeviceUnit="onDeleteDeviceUnit"
            @addDeviceSlot="onAddDeviceSlot"
            @deleteDeviceSlot="onDeleteDeviceSlot"
          />
        </v-card-media>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { NavigationIcon } from "../../libraries/constants";

import NoResultsPanel from "../common/NoResultsPanel.vue";
import DeviceSlotListEntry from "./DeviceSlotListEntry.vue";

import { IDeviceUnit, IDeviceSlot } from "sitewhere-rest-api";

@Component({
  components: {
    NoResultsPanel,
    DeviceSlotListEntry
  }
})
export default class DeviceUnitPanel extends Vue {
  @Prop() readonly deviceUnit!: IDeviceUnit;
  @Prop() readonly basePath!: string;

  /** Full path to unit */
  get fullPath(): string {
    return this.basePath ? this.basePath + this.deviceUnit.path + "/" : "/";
  }

  /** Icon for add */
  get addIcon(): NavigationIcon {
    return NavigationIcon.Add;
  }

  /** Icon for delete */
  get deleteIcon(): NavigationIcon {
    return NavigationIcon.Delete;
  }

  /** Fire event for adding a device unit */
  onAddDeviceUnitLocal() {
    this.$emit("addDeviceUnit", this.fullPath);
  }

  /** Fire event for adding a device unit */
  onAddDeviceUnit(parentUnitPath: string) {
    this.$emit("addDeviceUnit", parentUnitPath);
  }

  /** Fire event for deleting a device unit */
  onDeleteDeviceUnitLocal() {
    this.$emit("deleteDeviceUnit", this.fullPath);
  }

  /** Fire event for deleting a device unit */
  onDeleteDeviceUnit(unitPath: string) {
    this.$emit("deleteDeviceUnit", unitPath);
  }

  /** Fire event for adding a device slot */
  onAddDeviceSlotLocal() {
    this.$emit("addDeviceSlot", this.fullPath);
  }

  /** Fire event for adding a device slot */
  onAddDeviceSlot(unitPath: string) {
    this.$emit("addDeviceSlot", unitPath);
  }

  /** Fire event for deleting a device slot */
  onDeleteDeviceSlotLocal(deviceSlot: IDeviceSlot) {
    this.$emit("deleteDeviceSlot", this.fullPath, deviceSlot.path);
  }

  /** Fire event for deleting a device slot */
  onDeleteDeviceSlot(unitPath: string, slotPath: string) {
    this.$emit("deleteDeviceSlot", unitPath, slotPath);
  }
}
</script>

<style scoped>
</style>
