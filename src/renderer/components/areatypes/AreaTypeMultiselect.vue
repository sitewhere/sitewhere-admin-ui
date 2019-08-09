<template>
  <multichooser :idMode="idMode" :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import Multichooser from "../common/form/Multichooser.vue";

import { AxiosResponse } from "axios";
import { listAreaTypes } from "../../rest/sitewhere-area-types-api";
import {
  IAreaType,
  IAreaTypeSearchResults,
  IAreaTypeResponseFormat,
  IAreaTypeSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser
  }
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
    let format: IAreaTypeResponseFormat = {};
    let criteria: IAreaTypeSearchCriteria = {};
    let response: AxiosResponse<IAreaTypeSearchResults> = await listAreaTypes(
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
