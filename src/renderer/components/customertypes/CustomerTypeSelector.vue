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
    <slot/>
  </form-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import FormSelect from "../common/form/FormSelect.vue";

import { handleError } from "../common/Utils";
import { AxiosResponse } from "axios";
import { listCustomerTypes } from "../../rest/sitewhere-customer-types-api";
import {
  ICustomerType,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchCriteria,
  ICustomerTypeSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    FormSelect
  }
})
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
      let response: AxiosResponse<
        ICustomerTypeSearchResults
      > = await listCustomerTypes(this.$store, criteria, format);
      this.customerTypes = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }
}
</script>
