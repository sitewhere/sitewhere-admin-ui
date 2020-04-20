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
import { Component, Prop, listDeviceTypes } from "sitewhere-ide-common";

import { handleError } from "sitewhere-ide-common";
import { AxiosResponse } from "axios";
import {
  IDeviceType,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchCriteria,
  IDeviceTypeSearchResults
} from "sitewhere-rest-api";

@Component({})
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
    let criteria: IDeviceTypeSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    let format: IDeviceTypeResponseFormat = { includeAsset: true };
    try {
      let response: AxiosResponse<IDeviceTypeSearchResults> = await listDeviceTypes(
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
