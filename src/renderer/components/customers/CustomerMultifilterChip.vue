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
import { Component } from "sitewhere-ide-common";

import FilterChip from "../common/search/FilterChip.vue";

import { AxiosPromise } from "axios";
import { MultifilterChipComponent } from "../common/search/MultifilterChipComponent";

import { ICustomer, ICustomerResponseFormat } from "sitewhere-rest-api";
import { getCustomer } from "../../rest/sitewhere-customers-api";

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
    let format: ICustomerResponseFormat = {};
    return getCustomer(this.$store, this.tokens[0], format);
  }
}
</script>
