<template>
  <sw-list-entry>
    <v-container @click="onAreaTypeClicked">
      <v-layout row>
        <v-flex xs2>
          <v-card-media class="pt-2 pl-1">
            <font-awesome-icon class="grey--text" :icon="areaType.icon" size="3x" />
          </v-card-media>
        </v-flex>
        <v-flex xs10>
          <div>
            <div class="title ellipsis mb-1">{{ areaType.name }}</div>
            <div class="atdesc">{{ areaType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </sw-list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { IAreaType } from "sitewhere-rest-api";

@Component({})
export default class AreaTypeListEntry extends Vue {
  @Prop() readonly areaType!: IAreaType;

  // Callen when clicked.
  onAreaTypeClicked() {
    this.$emit("open", this.areaType);
  }
}
</script>

<style scoped>
.atdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
