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
import { Component, Prop } from "sitewhere-ide-common";

import FormSelect from "../common/form/FormSelect.vue";
import FormSelectCondensed from "../common/form/FormSelectCondensed.vue";

import { handleError } from "../common/Utils";
import { AxiosResponse } from "axios";
import { listCustomers } from "../../rest/sitewhere-customers-api";
import {
  ICustomer,
  ICustomerResponseFormat,
  ICustomerSearchCriteria,
  ICustomerSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    FormSelect,
    FormSelectCondensed
  }
})
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
    let criteria: ICustomerSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    let format: ICustomerResponseFormat = {};
    try {
      let response: AxiosResponse<ICustomerSearchResults> = await listCustomers(
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
