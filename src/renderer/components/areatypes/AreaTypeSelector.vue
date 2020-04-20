<template>
  <sw-form-select
    :items="areaTypes"
    :title="title || `Choose type of area`"
    :label="label || `Area Type`"
    item-text="name"
    item-value="token"
    v-model="wrapped"
    icon="settings"
  >
    <slot />
  </sw-form-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, listAreaTypes } from "sitewhere-ide-common";

import { showError } from "sitewhere-ide-common";
import { AxiosResponse } from "axios";
import {
  IAreaType,
  IAreaTypeResponseFormat,
  IAreaTypeSearchCriteria,
  IAreaTypeSearchResults
} from "sitewhere-rest-api";

@Component({})
export default class AreaTypeSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;

  areaTypes: IAreaType[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  async created() {
    let criteria: IAreaTypeSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    let format: IAreaTypeResponseFormat = {};
    try {
      let response: AxiosResponse<IAreaTypeSearchResults> = await listAreaTypes(
        this.$store,
        criteria,
        format
      );
      this.areaTypes = response.data.results;
    } catch (err) {
      showError(this, err);
    }
  }
}
</script>
