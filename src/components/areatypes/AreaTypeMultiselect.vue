<template>
  <multichooser :idMode="idMode" :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { listAreaTypes } from "sitewhere-ide-common";
import Vue from "vue";

import { Multichooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  IAreaType,
  IAreaTypeSearchResults,
  IAreaTypeResponseFormat,
  IAreaTypeSearchCriteria,
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser,
  },
})
export default class AreaTypeMultiselect extends Vue {
  @Prop() readonly value!: string[];
  @Prop({ default: false }) readonly idMode!: boolean;

  selected: string[] = [];
  all: IAreaType[] = [];

  created() {
    this.refresh();
  }

  /** Refresh list */
  async refresh() {
    const format: IAreaTypeResponseFormat = {};
    const criteria: IAreaTypeSearchCriteria = {};
    const response: AxiosResponse<IAreaTypeSearchResults> = await listAreaTypes(
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
