<template>
  <chooser
    :all="all"
    :chosenText="chosenText"
    :notChosenText="notChosenText"
    :value="value"
    @selected="onItemSelected"
  />
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import Chooser from "../common/form/Chooser.vue";

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
    Chooser
  }
})
export default class DeviceTypeChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: IDeviceType | null = null;
  all: IDeviceType[] = [];

  /** Initially load all areas */
  created() {
    this.refresh();
  }

  /** Refresh areas list */
  async refresh() {
    let format: IDeviceTypeResponseFormat = {};
    let criteria: IDeviceTypeSearchCriteria = {};
    let response: AxiosResponse<
      IDeviceTypeSearchResults
    > = await listDeviceTypes(this.$store, criteria, format);
    this.all = response.data.results;
  }

  /** Called when an item is selected */
  onItemSelected(item: IDeviceType) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
