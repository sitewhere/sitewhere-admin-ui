<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { listAreas } from "sitewhere-ide-common";
import Vue from "vue";

import { Multichooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
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
    const format: IAreaResponseFormat = {};
    const criteria: IAreaSearchCriteria = {};
    const response: AxiosResponse<IAreaSearchResults> = await listAreas(
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
