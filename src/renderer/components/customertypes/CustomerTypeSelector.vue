<template>
  <form-select
    :items="customerTypes"
    :title="title || `Choose type of customer`"
    :label="label || `Customer Type`"
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
import { Component, Prop, listCustomerTypes } from "sitewhere-ide-common";

import { handleError } from "sitewhere-ide-common";
import { AxiosResponse } from "axios";
import {
  ICustomerType,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchCriteria,
  ICustomerTypeSearchResults
} from "sitewhere-rest-api";

@Component({})
export default class CustomerTypeSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;

  customerTypes: ICustomerType[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  async created() {
    let criteria: ICustomerTypeSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    let format: ICustomerTypeResponseFormat = {};
    try {
      let response: AxiosResponse<ICustomerTypeSearchResults> = await listCustomerTypes(
        this.$store,
        criteria,
        format
      );
      this.customerTypes = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }
}
</script>
