<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import Multichooser from "../common/form/Multichooser.vue";

import { AxiosResponse } from "axios";
import { listCustomers } from "../../rest/sitewhere-customers-api";
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
    let format: ICustomerResponseFormat = {};
    let criteria: ICustomerSearchCriteria = {};
    let response: AxiosResponse<ICustomerSearchResults> = await listCustomers(
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
