<template>
  <v-card flat>
    <v-card-text>
      <area-chooser
        :chosenText="areaChosenText"
        :notChosenText="areaNotChosenText"
        v-model="selected"
      ></area-chooser>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import AreaChooser from "../areas/AreaChooser.vue";

@Component({
  components: {
    AreaChooser
  }
})
export default class DeviceListAreaFilter extends Vue {
  @Prop() readonly selected!: string;

  areaChosenText: string =
    "Search results will be limited to devices assigned to the area below.";
  areaNotChosenText: string =
    "Choose an area from the list below to limit search results to devices assigned to the given area.";
}
</script>
