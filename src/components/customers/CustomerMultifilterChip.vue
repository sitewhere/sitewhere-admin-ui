<template>
  <filter-chip
    v-if="token"
    type="customer"
    :token="token"
    :imageUrl="image"
    :label="label"
    :tooltip="tooltip"
    @closed="onFilterClosed"
  />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getCustomer } from "sitewhere-ide-common";

import FilterChip from "../common/search/FilterChip.vue";

import { AxiosPromise } from "axios";
import { MultifilterChipComponent } from "../common/search/MultifilterChipComponent";

import { ICustomer, ICustomerResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    FilterChip
  }
})
export default class CustomerMultifilterChip extends MultifilterChipComponent<
  ICustomer
> {
  /** Return method to load record */
  load(): AxiosPromise<ICustomer> {
    const format: ICustomerResponseFormat = {};
    return getCustomer(this.$store, this.tokens[0], format);
  }
}
</script>
