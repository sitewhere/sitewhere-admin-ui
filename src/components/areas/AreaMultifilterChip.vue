<template>
  <filter-chip
    v-if="token"
    type="area"
    :token="token"
    :imageUrl="image"
    :label="label"
    :tooltip="tooltip"
    @closed="onFilterClosed"
  />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getArea } from "sitewhere-ide-common";

import FilterChip from "../common/search/FilterChip.vue";

import { AxiosPromise } from "axios";
import { MultifilterChipComponent } from "../common/search/MultifilterChipComponent";

import { IArea, IAreaResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    FilterChip
  }
})
export default class AreaMultifilterChip extends MultifilterChipComponent<
  IArea
> {
  /** Return method to load record */
  load(): AxiosPromise<IArea> {
    const format: IAreaResponseFormat = {};
    return getArea(this.$store, this.tokens[0], format);
  }
}
</script>
