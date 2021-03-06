<template>
  <form-select-condensed
    v-if="dense"
    :items="deviceTypes"
    :title="title || `Choose type of device`"
    item-text="name"
    item-value="token"
    v-model="wrapped"
    icon="settings"
  />
  <form-select
    v-else
    :items="deviceTypes"
    :title="title || `Choose type of device`"
    :label="label || `Device Type`"
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
import { listDeviceTypes } from "sitewhere-ide-common";

import { FormSelect, FormSelectCondensed } from "sitewhere-ide-components";

import { handleError } from "sitewhere-ide-common";
import { AxiosResponse } from "axios";
import {
  IDeviceType,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchCriteria,
  IDeviceTypeSearchResults
} from "sitewhere-rest-api";

@Component({ components: { FormSelect, FormSelectCondensed } })
export default class DeviceTypeSelector extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly label!: string;
  @Prop({ default: false }) readonly dense!: boolean;

  deviceTypes: IDeviceType[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  async created() {
    const criteria: IDeviceTypeSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    const format: IDeviceTypeResponseFormat = { includeAsset: true };
    try {
      const response: AxiosResponse<IDeviceTypeSearchResults> = await listDeviceTypes(
        this.$store,
        criteria,
        format
      );
      this.deviceTypes = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }
}
</script>
