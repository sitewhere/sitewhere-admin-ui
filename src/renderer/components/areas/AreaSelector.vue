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
import { Component, Prop } from "sitewhere-ide-common";

import FormSelect from "../common/form/FormSelect.vue";
import FormSelectCondensed from "../common/form/FormSelectCondensed.vue";

import { handleError } from "../common/Utils";
import { AxiosResponse } from "axios";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaResponseFormat,
  IAreaSearchCriteria,
  IAreaSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    FormSelect,
    FormSelectCondensed
  }
})
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
    let criteria: IAreaSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    let format: IAreaResponseFormat = { includeAreaType: true };
    try {
      let response: AxiosResponse<IAreaSearchResults> = await listAreas(
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
