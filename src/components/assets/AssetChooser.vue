<template>
  <chooser
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
import { listAssets } from "sitewhere-ide-common";

import { Chooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  IAsset,
  IAssetSearchResults,
  IAssetResponseFormat,
  IAssetSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Chooser
  }
})
export default class AssetChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: IAsset | null = null;
  all: IAsset[] = [];

  /** Initially load all areas */
  created() {
    this.refresh();
  }

  /** Refresh areas list */
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

  /** Called when an item is selected */
  onItemSelected(item: IAsset) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
