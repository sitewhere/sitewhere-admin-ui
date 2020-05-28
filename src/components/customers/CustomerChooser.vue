<template>
  <chooser
    :all="all"
    :chosenText="chosenText"
    :notChosenText="notChosenText"
    :value="value"
    @selected="onItemSelected"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { listCustomers } from "sitewhere-ide-common";

import { Chooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  ICustomer,
  ICustomerSearchResults,
  ICustomerResponseFormat,
  ICustomerSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Chooser
  }
})
export default class CustomerChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: ICustomer | null = null;
  all: ICustomer[] = [];

  /** Initially load all areas */
  created() {
    this.refresh();
  }

  /** Refresh areas list */
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

  /** Called when an item is selected */
  onItemSelected(item: ICustomer) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
