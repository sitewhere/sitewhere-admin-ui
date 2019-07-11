<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import Multichooser from "../common/form/Multichooser.vue";

import { AxiosResponse } from "axios";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchResults,
  IAreaResponseFormat,
  IAreaSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser
  }
})
export default class AreaMultiselect extends Vue {
  @Prop() readonly value!: string[];

  selected: string[] = [];
  all: IArea[] = [];

  /** Initially load all areas */
  created() {
    this.refresh();
  }

  /** Refresh areas list */
  async refresh() {
    let format: IAreaResponseFormat = {};
    let criteria: IAreaSearchCriteria = {};
    let response: AxiosResponse<IAreaSearchResults> = await listAreas(
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
