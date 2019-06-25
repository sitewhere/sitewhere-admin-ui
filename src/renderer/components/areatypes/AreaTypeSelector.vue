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
    <slot/>
  </form-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import FormSelect from "../common/form/FormSelect.vue";

import { handleError } from "../common/Utils";
import { AxiosResponse } from "axios";
import { listAreaTypes } from "../../rest/sitewhere-area-types-api";
import {
  IAreaType,
  IAreaTypeResponseFormat,
  IAreaTypeSearchCriteria,
  IAreaTypeSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    FormSelect
  }
})
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
      handleError(err);
    }
  }
}
</script>
