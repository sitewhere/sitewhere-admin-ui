<template>
  <multichooser :all="all" v-model="selected" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { listDeviceTypes } from "sitewhere-ide-common";
import Vue from "vue";

import { Multichooser } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
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
    const format: IDeviceTypeResponseFormat = {};
    const criteria: IDeviceTypeSearchCriteria = {};
    const response: AxiosResponse<IDeviceTypeSearchResults> = await listDeviceTypes(
      this.$store,
      criteria,
      format
    );
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
