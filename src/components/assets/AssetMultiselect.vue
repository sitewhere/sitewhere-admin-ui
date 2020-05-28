<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { listAssets } from "sitewhere-ide-common";
import Vue from "vue";

import { Multichooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
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
    const format: IAssetResponseFormat = {};
    const criteria: IAssetSearchCriteria = {};
    const response: AxiosResponse<IAssetSearchResults> = await listAssets(
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
