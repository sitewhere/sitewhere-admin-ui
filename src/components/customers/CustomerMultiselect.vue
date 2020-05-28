<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { listCustomers } from "sitewhere-ide-common";
import Vue from "vue";

import { Multichooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  ICustomer,
  ICustomerSearchResults,
  ICustomerResponseFormat,
  ICustomerSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser
  }
})
export default class CustomerMultiselect extends Vue {
  @Prop() readonly value!: string[];

  selected: string[] = [];
  all: ICustomer[] = [];

  created() {
    this.refresh();
  }

  /** Refresh list */
  async refresh() {
    const format: ICustomerResponseFormat = {};
    const criteria: ICustomerSearchCriteria = {};
    const response: AxiosResponse<ICustomerSearchResults> = await listCustomers(
      this.$store,
      criteria,
      format
    );
    this.all = response.data.results;
  }

  @Watch("value", { immediate: true })
  onValuesSet(updated: string[]) {
    this.selected = updated;
  }

  @Watch("selected", { immediate: true })
  onSelectionUpdated(updated: string[]) {
    this.$emit("input", updated);
  }
}
</script>
