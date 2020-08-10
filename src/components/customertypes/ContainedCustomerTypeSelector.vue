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
import { Component, Prop, Watch } from "vue-property-decorator";
import {
  getCustomerType,
  listCustomerTypes,
  showError,
} from "sitewhere-ide-common";

import { FormSelect } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  ICustomer,
  ICustomerType,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchCriteria,
  ICustomerTypeSearchResults,
} from "sitewhere-rest-api";

@Component({ components: { FormSelect } })
export default class ContainedCustomerTypeSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;
  @Prop() readonly parentCustomer!: ICustomer;

  customerTypes: ICustomerType[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  created() {
    this.refresh();
  }

  @Watch("parentCustomer")
  onParentCustomerUpdated() {
    this.refresh();
  }

  async refresh() {
    if (this.parentCustomer) {
      try {
        const format: ICustomerTypeResponseFormat = {};
        const response: AxiosResponse<ICustomerType> = await getCustomerType(
          this.$store,
          (this.parentCustomer as any).customerType.token,
          format
        );
        if (response.data) {
          this.customerTypes = response.data.containedCustomerTypes || [];
        }
      } catch (err) {
        showError(this, err);
      }
    } else {
      const criteria: ICustomerTypeSearchCriteria = {
        pageNumber: 1,
        pageSize: 0,
      };
      const format: ICustomerTypeResponseFormat = {};
      try {
        const response: AxiosResponse<ICustomerTypeSearchResults> = await listCustomerTypes(
          this.$store,
          criteria,
          format
        );
        this.customerTypes = response.data.results;
      } catch (err) {
        showError(this, err);
      }
    }
  }
}
</script>
