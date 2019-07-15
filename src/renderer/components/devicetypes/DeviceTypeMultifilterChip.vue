<template>
  <filter-chip
    v-if="token"
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
import { MultifilterChipComponent } from "../common/search/MultifilterChipComponent";

import { IDeviceType, IDeviceTypeResponseFormat } from "sitewhere-rest-api";
import { getDeviceType } from "../../rest/sitewhere-device-types-api";

@Component({
  components: {
    FilterChip
  }
})
export default class DeviceTypeMultifilterChip extends MultifilterChipComponent<
  IDeviceType
> {
  /** Return method to load record */
  load(): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {};
    return getDeviceType(this.$store, this.tokens[0], format);
  }
}
</script>
