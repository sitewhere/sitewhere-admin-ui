<template>
  <chooser
    class="ma-0"
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
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchResults,
  IAreaResponseFormat,
  IAreaSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Chooser
  }
})
export default class AreaChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: IArea | null = null;
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

  /** Called when an item is selected */
  onItemSelected(item: IArea) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
