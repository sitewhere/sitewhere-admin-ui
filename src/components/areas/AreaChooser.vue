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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { listAreas } from "sitewhere-ide-common";

import { Chooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
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
    const format: IAreaResponseFormat = {};
    const criteria: IAreaSearchCriteria = {};
    const response: AxiosResponse<IAreaSearchResults> = await listAreas(
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
