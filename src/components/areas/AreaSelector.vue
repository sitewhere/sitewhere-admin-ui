<template>
  <form-select-condensed
    v-if="dense"
    :items="items"
    :title="title || `Choose area`"
    item-text="name"
    item-value="token"
    v-model="wrapped"
    icon="settings"
  />
  <form-select
    v-else
    :items="items"
    :title="title || `Choose area`"
    :label="label || `Area`"
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
import { listAreas, handleError } from "sitewhere-ide-common";

import { FormSelectCondensed, FormSelect } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  IArea,
  IAreaResponseFormat,
  IAreaSearchCriteria,
  IAreaSearchResults
} from "sitewhere-rest-api";

@Component({ components: { FormSelectCondensed, FormSelect } })
export default class AreaSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;
  @Prop({ default: false }) readonly dense!: boolean;

  items: IArea[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  async created() {
    const criteria: IAreaSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    const format: IAreaResponseFormat = { includeAreaType: true };
    try {
      const response: AxiosResponse<IAreaSearchResults> = await listAreas(
        this.$store,
        criteria,
        format
      );
      this.items = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }
}
</script>
