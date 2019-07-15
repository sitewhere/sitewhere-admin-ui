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
import { Component } from "sitewhere-ide-common";

import FilterChip from "../common/search/FilterChip.vue";

import { AxiosPromise } from "axios";
import { MultifilterChipComponent } from "../common/search/MultifilterChipComponent";

import { IAsset, IAssetResponseFormat } from "sitewhere-rest-api";
import { getAsset } from "../../rest/sitewhere-assets-api";

@Component({
  components: {
    FilterChip
  }
})
export default class AssetMultifilterChip extends MultifilterChipComponent<
  IAsset
> {
  /** Return method to load record */
  load(): AxiosPromise<IAsset> {
    let format: IAssetResponseFormat = {};
    return getAsset(this.$store, this.tokens[0], format);
  }
}
</script>
