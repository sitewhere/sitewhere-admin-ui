<template>
  <filter-chip
    type="devicetype"
    :token="token"
    :imageUrl="image"
    :label="label"
    :tooltip="tooltip"
    @closed="onFilterClosed"
  />
</template>

<script lang="ts">
import { Component } from "sitewhere-ide-common";

import FilterChip from "../common/search/FilterChip.vue";

import { AxiosPromise } from "axios";
import { FilterChipComponent } from "../common/search/FilterChipComponent";

import { IDeviceType, IDeviceTypeResponseFormat } from "sitewhere-rest-api";
import { getDeviceType } from "../../rest/sitewhere-device-types-api";

@Component({
  components: {
    FilterChip
  }
})
export default class DeviceTypeFilterChip extends FilterChipComponent<
  IDeviceType
> {
  /** Return method to load record */
  load(): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {};
    return getDeviceType(this.$store, this.token, format);
  }
}
</script>
