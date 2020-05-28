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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { listDeviceTypes } from "sitewhere-ide-common";

import { Chooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
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
    const format: IDeviceTypeResponseFormat = {};
    const criteria: IDeviceTypeSearchCriteria = {};
    const response: AxiosResponse<IDeviceTypeSearchResults> = await listDeviceTypes(
      this.$store,
      criteria,
      format
    );
    this.all = response.data.results;
  }

  /** Called when an item is selected */
  onItemSelected(item: IDeviceType) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
