<template>
  <list-filter-bar v-if="active" @clear="onClearCriteria">
    <device-type-multifilter-chip
      :tokens="deviceTypeTokens"
      :tooltip="deviceTypeTooltip"
      @closed="onClearDeviceTypes"
    />
    <customer-multifilter-chip
      :tokens="customerTokens"
      :tooltip="customerTooltip"
      @closed="onClearCustomers"
    />
    <area-multifilter-chip :tokens="areaTokens" :tooltip="areaTooltip" @closed="onClearAreas" />
    <asset-multifilter-chip :tokens="assetTokens" :tooltip="assetTooltip" @closed="onClearAssets" />
  </list-filter-bar>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import ListFilterBar from "../common/search/ListFilterBar.vue";
import DeviceTypeMultifilterChip from "../devicetypes/DeviceTypeMultifilterChip.vue";
import CustomerMultifilterChip from "../customers/CustomerMultifilterChip.vue";
import AreaMultifilterChip from "../areas/AreaMultifilterChip.vue";
import AssetMultifilterChip from "../assets/AssetMultifilterChip.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    ListFilterBar,
    DeviceTypeMultifilterChip,
    CustomerMultifilterChip,
    AreaMultifilterChip,
    AssetMultifilterChip
  }
})
export default class AssignmentListFilterBar extends Vue {
  @Prop() readonly criteria!: IDeviceAssignmentSearchCriteria;

  /** Indicates whether a filter is active */
  get active(): boolean {
    return (
      this.hasContent(this.criteria.deviceTypeTokens) ||
      this.hasContent(this.criteria.customerTokens) ||
      this.hasContent(this.criteria.areaTokens) ||
      this.hasContent(this.criteria.assetTokens)
    );
  }

  hasContent(tokens: string[] | undefined): boolean {
    if (tokens && tokens.length) {
      return true;
    }
    return false;
  }

  /** Tokens for device types filter */
  get deviceTypeTokens(): string[] | [] {
    if (this.criteria && this.criteria.deviceTypeTokens) {
      return this.criteria.deviceTypeTokens;
    }
    return [];
  }

  /** Tokens for customers filter */
  get customerTokens(): string[] | [] {
    if (this.criteria && this.criteria.customerTokens) {
      return this.criteria.customerTokens;
    }
    return [];
  }

  /** Tokens for areas filter */
  get areaTokens(): string[] | [] {
    if (this.criteria && this.criteria.areaTokens) {
      return this.criteria.areaTokens;
    }
    return [];
  }

  /** Tokens for assets filter */
  get assetTokens(): string[] | [] {
    if (this.criteria && this.criteria.assetTokens) {
      return this.criteria.assetTokens;
    }
    return [];
  }

  /** Tooltip for device types filter */
  get deviceTypeTooltip(): string | null {
    if (this.criteria && this.criteria.deviceTypeTokens) {
      return `Filtering by ${this.criteria.deviceTypeTokens.length} device types.`;
    }
    return null;
  }

  /** Tooltip for areas filter */
  get customerTooltip(): string | null {
    if (this.criteria && this.criteria.customerTokens) {
      return `Filtering by ${this.criteria.customerTokens.length} customers.`;
    }
    return null;
  }

  /** Tooltip for areas filter */
  get areaTooltip(): string | null {
    if (this.criteria && this.criteria.areaTokens) {
      return `Filtering by ${this.criteria.areaTokens.length} areas.`;
    }
    return null;
  }

  /** Tooltip for assets filter */
  get assetTooltip(): string | null {
    if (this.criteria && this.criteria.assetTokens) {
      return `Filtering by ${this.criteria.assetTokens.length} assets.`;
    }
    return null;
  }

  /** Clear device types from filter */
  onClearDeviceTypes() {
    let clone: IDeviceAssignmentSearchCriteria = Object.assign(
      {},
      this.criteria
    );
    clone.deviceTypeTokens = undefined;
    this.$emit("update", clone);
  }

  /** Clear customers from filter */
  onClearCustomers() {
    let clone: IDeviceAssignmentSearchCriteria = Object.assign(
      {},
      this.criteria
    );
    clone.customerTokens = undefined;
    this.$emit("update", clone);
  }

  /** Clear areas from filter */
  onClearAreas() {
    let clone: IDeviceAssignmentSearchCriteria = Object.assign(
      {},
      this.criteria
    );
    clone.areaTokens = undefined;
    this.$emit("update", clone);
  }

  /** Clear assets from filter */
  onClearAssets() {
    let clone: IDeviceAssignmentSearchCriteria = Object.assign(
      {},
      this.criteria
    );
    clone.assetTokens = undefined;
    this.$emit("update", clone);
  }

  /** Clear criteria */
  onClearCriteria() {
    this.$emit("clear");
  }
}
</script>
