<template>
  <form-select
    :items="assetTypes"
    :title="title || `Choose type of asset`"
    :label="label || `Asset Type`"
    item-text="name"
    item-value="token"
    v-model="wrapped"
    icon="settings"
  >
    <slot />
  </form-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { listAssetTypes, handleError } from "sitewhere-ide-common";

import { FormSelect } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  IAssetType,
  IAssetTypeResponseFormat,
  IAssetTypeSearchCriteria,
  IAssetTypeSearchResults
} from "sitewhere-rest-api";

@Component({ components: { FormSelect } })
export default class AssetTypeSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;

  assetTypes: IAssetType[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  async created() {
    const criteria: IAssetTypeSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    const format: IAssetTypeResponseFormat = {};
    try {
      const response: AxiosResponse<IAssetTypeSearchResults> = await listAssetTypes(
        this.$store,
        criteria,
        format
      );
      this.assetTypes = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }
}
</script>
