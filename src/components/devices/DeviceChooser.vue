<template>
  <device-chooser-base
    :all="all"
    :chosenText="chosenText"
    :notChosenText="notChosenText"
    :value="value"
    @selected="onItemSelected"
  />
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { listDevices } from "sitewhere-ide-common";
import Vue from "vue";

import DeviceChooserBase from "./DeviceChooserBase.vue";

import { AxiosResponse } from "axios";
import {
  IDevice,
  IDeviceSearchResults,
  IDeviceResponseFormat,
  IDeviceSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceChooserBase
  }
})
export default class DeviceChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: IDevice | null = null;
  all: IDevice[] = [];

  /** Initially load all items */
  created() {
    this.refresh();
  }

  /** Refresh items list */
  async refresh() {
    const format: IDeviceResponseFormat = { includeDeviceType: true };
    const criteria: IDeviceSearchCriteria = {};
    const response: AxiosResponse<IDeviceSearchResults> = await listDevices(
      this.$store,
      criteria,
      format
    );
    this.all = response.data.results;
  }

  /** Called when an item is selected */
  onItemSelected(item: IDevice) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
