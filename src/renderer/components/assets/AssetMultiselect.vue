<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import Multichooser from "../common/form/Multichooser.vue";

import { AxiosResponse } from "axios";
import { listAssets } from "../../rest/sitewhere-assets-api";
import {
  IAsset,
  IAssetSearchResults,
  IAssetResponseFormat,
  IAssetSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser
  }
})
export default class AssetMultiselect extends Vue {
  @Prop() readonly value!: string[];

  selected: string[] = [];
  all: IAsset[] = [];

  created() {
    this.refresh();
  }

  /** Refresh list */
  async refresh() {
    let format: IAssetResponseFormat = {};
    let criteria: IAssetSearchCriteria = {};
    let response: AxiosResponse<
      IAssetSearchResults
    > = await listAssets(this.$store, criteria, format);
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
