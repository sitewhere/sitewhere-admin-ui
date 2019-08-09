<template>
  <multichooser :idMode="idMode" :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import Multichooser from "../common/form/Multichooser.vue";

import { AxiosResponse } from "axios";
import { listCustomerTypes } from "../../rest/sitewhere-customer-types-api";
import {
  ICustomerType,
  ICustomerTypeSearchResults,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser
  }
})
export default class CustomerTypeMultiselect extends Vue {
  @Prop() readonly value!: string[];
  @Prop({ default: false }) readonly idMode!: boolean;

  selected: string[] = [];
  all: ICustomerType[] = [];

  created() {
    this.refresh();
  }

  /** Refresh list */
  async refresh() {
    let format: ICustomerTypeResponseFormat = {};
    let criteria: ICustomerTypeSearchCriteria = {};
    let response: AxiosResponse<
      ICustomerTypeSearchResults
    > = await listCustomerTypes(this.$store, criteria, format);
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
