<template>
  <v-list-tile>
    <v-icon class="grey--text mr-2">storage</v-icon>
    <v-list-tile-content>{{ deviceSlot.name }} ({{ fullPath }})</v-list-tile-content>
    <v-list-tile-action>
      <v-icon @click="onDeleteDeviceSlot">{{deleteIcon}}</v-icon>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { NavigationIcon } from "../../libraries/constants";

import { IDeviceSlot } from "sitewhere-rest-api";

@Component({})
export default class DeviceSlotListEntry extends Vue {
  @Prop() readonly deviceSlot!: IDeviceSlot;
  @Prop() readonly unitPath!: string;

  /** Full path to unit */
  get fullPath(): string {
    return this.unitPath + this.deviceSlot.path;
  }

  /** Icon for delete */
  get deleteIcon(): NavigationIcon {
    return NavigationIcon.Delete;
  }

  /** Emit message to delete device slot */
  onDeleteDeviceSlot() {
    this.$emit("deleteDeviceSlot", this.unitPath, this.deviceSlot.path);
  }
}
</script>

<style scoped>
</style>
