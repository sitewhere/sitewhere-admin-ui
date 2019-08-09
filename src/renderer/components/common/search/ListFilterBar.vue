<template>
  <div>
    <v-toolbar dense flat color="#eee" class="tb">
      <v-icon style="pointer-events: none;" class="mr-2">{{ icon }}</v-icon>
      <slot />
      <v-spacer />
      <v-tooltip left>
        <v-icon color="#bbb;" @click="onClear" slot="activator">delete</v-icon>
        <span>Clear Filter</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider />
  </div>
</template>

<script lang="ts">
import { Component } from "sitewhere-ide-common";
import Vue from "vue";

import { NavigationIcon } from "../../../libraries/constants";

@Component({})
export default class ListFilterBar extends Vue {
  icon: string = NavigationIcon.Filter;

  onClear() {
    this.$emit("clear");
  }
}
</script>

<style scoped>
.tb >>> .v-toolbar__content {
  padding: 0 10px;
}
</style>
