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
import { Component, Prop } from "vue-property-decorator";
import { listAssetTypes } from "sitewhere-ide-common";
import Vue from "vue";

import Chooser from "../common/form/Chooser.vue";

import { AxiosResponse } from "axios";
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
    const format: IAssetTypeResponseFormat = {};
    const criteria: IAssetTypeSearchCriteria = {};
    const response: AxiosResponse<IAssetTypeSearchResults> = await listAssetTypes(
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
