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
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import Chooser from "../common/form/Chooser.vue";

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
    let format: ICustomerResponseFormat = {};
    let criteria: ICustomerSearchCriteria = {};
    let response: AxiosResponse<ICustomerSearchResults> = await listCustomers(
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
