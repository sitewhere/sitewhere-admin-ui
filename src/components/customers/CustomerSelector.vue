<template>
  <form-select-condensed
    v-if="dense"
    :items="customers"
    :title="title || `Choose customer`"
    item-text="name"
    item-value="token"
    v-model="wrapped"
    icon="settings"
  />
  <form-select
    v-else
    :items="customers"
    :title="title || `Choose customer`"
    :label="label || `Customer`"
    item-text="name"
    item-value="token"
    v-model="wrapped"
    icon="settings"
  >
    <slot />
  </form-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { listCustomers, handleError } from "sitewhere-ide-common";

import { FormSelectCondensed, FormSelect } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  ICustomer,
  ICustomerResponseFormat,
  ICustomerSearchCriteria,
  ICustomerSearchResults
} from "sitewhere-rest-api";

@Component({ components: { FormSelectCondensed, FormSelect } })
export default class CustomerSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;
  @Prop({ default: false }) readonly dense!: boolean;

  customers: ICustomer[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  async created() {
    const criteria: ICustomerSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    const format: ICustomerResponseFormat = {};
    try {
      const response: AxiosResponse<ICustomerSearchResults> = await listCustomers(
        this.$store,
        criteria,
        format
      );
      this.customers = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }
}
</script>
