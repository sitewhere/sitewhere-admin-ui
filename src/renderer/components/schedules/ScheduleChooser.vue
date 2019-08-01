<template>
  <chooser
    class="ma-0"
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
import { listSchedules } from "../../rest/sitewhere-schedules-api";
import {
  ISchedule,
  IScheduleSearchResults,
  IScheduleResponseFormat,
  IScheduleSearchCriteria
} from "sitewhere-rest-api";

@Component({
  components: {
    Chooser
  }
})
export default class ScheduleChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  selected: ISchedule | null = null;
  all: ISchedule[] = [];

  /** Initially load all items */
  created() {
    this.refresh();
  }

  /** Refresh items list */
  async refresh() {
    let format: IScheduleResponseFormat = {};
    let criteria: IScheduleSearchCriteria = {};
    let response: AxiosResponse<IScheduleSearchResults> = await listSchedules(
      this.$store,
      criteria,
      format
    );
    this.all = response.data.results;
  }

  /** Called when an item is selected */
  onItemSelected(item: ISchedule) {
    this.selected = item;
    this.$emit("input", item);
  }
}
</script>
