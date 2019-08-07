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
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import DeviceChooserBase from "./DeviceChooserBase.vue";

import { AxiosResponse } from "axios";
import { listDevices } from "../../rest/sitewhere-devices-api";
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
    let format: IDeviceResponseFormat = { includeDeviceType: true };
    let criteria: IDeviceSearchCriteria = {};
    let response: AxiosResponse<IDeviceSearchResults> = await listDevices(
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
