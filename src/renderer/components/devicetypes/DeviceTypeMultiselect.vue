<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import Multichooser from "../common/form/Multichooser.vue";

import { AxiosResponse } from "axios";
import { listDeviceTypes } from "../../rest/sitewhere-device-types-api";
import {
  IDeviceType,
  IDeviceTypeSearchResults,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Multichooser
  }
})
export default class DeviceTypeMultiselect extends Vue {
  @Prop() readonly value!: string[];

  selected: string[] = [];
  all: IDeviceType[] = [];

  created() {
    this.refresh();
  }

  /** Refresh list */
  async refresh() {
    let format: IDeviceTypeResponseFormat = {};
    let criteria: IDeviceTypeSearchCriteria = {};
    let response: AxiosResponse<
      IDeviceTypeSearchResults
    > = await listDeviceTypes(this.$store, criteria, format);
    this.all = response.data.results;
  }

  @Watch("value", { immediate: true })
  onValuesSet(updated: string[]) {
    this.selected = updated;
  }

  @Watch("selected", { immediate: true })
  onSelectionUpdated(updated: string[]) {
    this.$emit("input", updated);
  }
}
</script>
