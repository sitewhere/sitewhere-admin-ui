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
import { Component, Prop, Watch } from "vue-property-decorator";
import { getAreaType, listAreaTypes, showError } from "sitewhere-ide-common";

import { FormSelect } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  IArea,
  IAreaType,
  IAreaTypeResponseFormat,
  IAreaTypeSearchCriteria,
  IAreaTypeSearchResults,
} from "sitewhere-rest-api";

@Component({ components: { FormSelect } })
export default class ContainedAreaTypeSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;
  @Prop() readonly parentArea!: IArea;

  areaTypes: IAreaType[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  created() {
    this.refresh();
  }

  @Watch("parentArea")
  onParentAreaUpdated() {
    this.refresh();
  }

  async refresh() {
    if (this.parentArea) {
      try {
        const format: IAreaTypeResponseFormat = {};
        const response: AxiosResponse<IAreaType> = await getAreaType(
          this.$store,
          (this.parentArea as any).areaType.token,
          format
        );
        if (response.data) {
          this.areaTypes = response.data.containedAreaTypes || [];
        }
      } catch (err) {
        showError(this, err);
      }
    } else {
      const criteria: IAreaTypeSearchCriteria = {
        pageNumber: 1,
        pageSize: 0,
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
}
</script>
