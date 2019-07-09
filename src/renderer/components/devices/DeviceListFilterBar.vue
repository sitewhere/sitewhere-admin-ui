<template>
  <list-filter-bar v-if="active" @clear="onClearCriteria">
    <device-type-filter-chip
      v-if="hasDeviceTypeFilter"
      :token="deviceTypeToken"
      tooltip="Include devices of this type in filter criteria"
      @closed="onDeviceTypeFilterCleared"
    />
  </list-filter-bar>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import ListFilterBar from "../common/search/ListFilterBar.vue";
import DeviceTypeFilterChip from "../devicetypes/DeviceTypeFilterChip.vue";

import { IDeviceSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    ListFilterBar,
    DeviceTypeFilterChip
  }
})
export default class DeviceListFilterBar extends Vue {
  @Prop() readonly criteria!: IDeviceSearchCriteria;

  /** Indicates if there is a device type filter active */
  get hasDeviceTypeFilter(): boolean {
    if (this.criteria && this.criteria.deviceTypeToken) {
      return true;
    }
    return false;
  }

  /** Device type token if used as filter */
  get deviceTypeToken(): string | undefined {
    return this.hasDeviceTypeFilter ? this.criteria.deviceTypeToken : undefined;
  }

  /** Indicates whether a filter is active */
  get active(): boolean {
    if (this.hasDeviceTypeFilter) {
      return true;
    }
    return false;
  }

  /** Handle device type filter cleared */
  onDeviceTypeFilterCleared() {
    this.$emit("clear");
  }

  /** Clear criteria */
  onClearCriteria() {
    this.$emit("clear");
  }
}
</script>
