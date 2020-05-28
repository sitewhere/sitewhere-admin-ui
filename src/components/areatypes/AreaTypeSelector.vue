<template>
  <form-select
    :items="areaTypes"
    :title="title || `Choose type of area`"
    :label="label || `Area Type`"
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
import { listAreaTypes, showError } from "sitewhere-ide-common";

import { FormSelect } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  IAreaType,
  IAreaTypeResponseFormat,
  IAreaTypeSearchCriteria,
  IAreaTypeSearchResults
} from "sitewhere-rest-api";

@Component({ components: { FormSelect } })
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
    const criteria: IAreaTypeSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    const format: IAreaTypeResponseFormat = {};
    try {
      const response: AxiosResponse<IAreaTypeSearchResults> = await listAreaTypes(
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
