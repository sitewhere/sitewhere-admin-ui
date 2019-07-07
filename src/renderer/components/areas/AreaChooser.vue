<template>
  <div>
    <div v-if="area">
      <v-card-text>{{ chosenText }}</v-card-text>
      <v-list two-line>
        <v-list-tile avatar :key="area.token">
          <v-list-tile-avatar>
            <img :src="area.imageUrl" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="area.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="area.description"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple @click.stop="onAreaRemoved(true)">
              <v-icon class="grey--text">fa-times</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else>
      <v-card-text>{{ notChosenText }}</v-card-text>
      <v-list v-if="areas" class="area-list" two-line>
        <template v-for="area in areas">
          <v-list-tile avatar :key="area.token" @click="onAreaChosen(area, true)">
            <v-list-tile-avatar>
              <img :src="area.imageUrl" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="area.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="area.description"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import { AxiosResponse } from "axios";
import { listAreas } from "../../rest/sitewhere-areas-api";
import {
  IArea,
  IAreaSearchResults,
  IAreaResponseFormat,
  IAreaSearchCriteria
} from "sitewhere-rest-api";

@Component({})
export default class AreaChooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;

  area: IArea | null = null;
  areas: IArea[] = [];

  /** Initially load all areas */
  created() {
    this.refresh();
  }

  /** Refresh areas list */
  async refresh() {
    let format: IAreaResponseFormat = {};
    let criteria: IAreaSearchCriteria = {};
    let response: AxiosResponse<IAreaSearchResults> = await listAreas(
      this.$store,
      criteria,
      format
    );
    this.areas = response.data.results;
    if (this.value) {
      this.onValueUpdated(this.value);
    }
  }

  @Watch("value", { immediate: true })
  onValueChanged(updated: string) {
    this.onValueUpdated(updated);
  }

  /** Called to update choice based on token */
  onValueUpdated(token: string) {
    let found: boolean = false;
    this.areas.forEach(area => {
      if (area.token === token) {
        found = true;
        this.onAreaChosen(area, false);
      }
    });
    if (!found) {
      this.onAreaRemoved(false);
    }
  }

  /** Called when an area is chosen */
  onAreaChosen(area: IArea, emit: boolean) {
    this.area = area;
    if (emit) {
      this.$emit("input", area.token);
    }
  }

  /** Remove area selection */
  onAreaRemoved(emit: boolean) {
    this.area = null;
    if (emit) {
      this.$emit("input", null);
    }
  }
}
</script>

<style scoped>
.area-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
