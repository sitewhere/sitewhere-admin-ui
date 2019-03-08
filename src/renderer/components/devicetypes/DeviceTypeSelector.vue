<template>
  <v-select
    :items="deviceTypes"
    item-text="name"
    item-value="token"
    v-model="selectedToken"
    hide-details
    single-line
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { handleError } from "../common/Utils";
import { AxiosResponse } from "axios";
import { listDeviceTypes } from "../../rest/sitewhere-device-types-api";
import {
  IDeviceType,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchCriteria,
  IDeviceTypeSearchResults
} from "sitewhere-rest-api/dist/model/device-types-model";

@Component
export default class DeviceTypeSelector extends Vue {
  @Prop(String) readonly value!: string;

  deviceTypes: IDeviceType[] = [];
  selectedToken: string | null = null;

  async created() {
    this.selectedToken = this.value;
    let criteria: IDeviceTypeSearchCriteria = {
      pageNumber: 1,
      pageSize: 0
    };
    let format: IDeviceTypeResponseFormat = { includeAsset: true };
    try {
      let response: AxiosResponse<
        IDeviceTypeSearchResults
      > = await listDeviceTypes(this.$store, criteria, format);
      this.deviceTypes = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }
}
</script>

<style scoped>
</style>
