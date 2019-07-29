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
import { listAssetTypes } from "../../rest/sitewhere-asset-types-api";
import {
  IAssetType,
  IAssetTypeSearchResults,
  IAssetTypeResponseFormat,
  IAssetTypeSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Chooser
  }
})
export default class AssetTypeChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: IAssetType | null = null;
  all: IAssetType[] = [];

  /** Initially load all items */
  created() {
    this.refresh();
  }

  /** Refresh items list */
  async refresh() {
    let format: IAssetTypeResponseFormat = {};
    let criteria: IAssetTypeSearchCriteria = {};
    let response: AxiosResponse<IAssetTypeSearchResults> = await listAssetTypes(
      this.$store,
      criteria,
      format
    );
    this.all = response.data.results;
  }

  /** Called when an item is selected */
  onItemSelected(item: IAssetType) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
