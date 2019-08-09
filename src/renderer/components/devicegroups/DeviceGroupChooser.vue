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
import { listDeviceGroups } from "../../rest/sitewhere-device-groups-api";
import {
  IDeviceGroup,
  IDeviceGroupSearchResults,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Chooser
  }
})
export default class DeviceGroupChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: IDeviceGroup | null = null;
  all: IDeviceGroup[] = [];

  /** Initially load all items */
  created() {
    this.refresh();
  }

  /** Refresh item list */
  async refresh() {
    let format: IDeviceGroupResponseFormat = {};
    let criteria: IDeviceGroupSearchCriteria = {};
    let response: AxiosResponse<
      IDeviceGroupSearchResults
    > = await listDeviceGroups(this.$store, criteria, format);
    this.all = response.data.results;
  }

  /** Called when an item is selected */
  onItemSelected(item: IDeviceGroup) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
