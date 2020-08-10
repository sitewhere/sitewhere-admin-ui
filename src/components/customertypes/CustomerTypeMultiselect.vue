<template>
  <multichooser :idMode="idMode" :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { listCustomerTypes } from "sitewhere-ide-common";
import { Multichooser } from "sitewhere-ide-components";
import Vue from "vue";

import { AxiosResponse } from "axios";
import {
  ICustomerType,
  ICustomerTypeSearchResults,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchCriteria,
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser,
  },
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
    const format: ICustomerTypeResponseFormat = {};
    const criteria: ICustomerTypeSearchCriteria = {};
    const response: AxiosResponse<ICustomerTypeSearchResults> = await listCustomerTypes(
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
