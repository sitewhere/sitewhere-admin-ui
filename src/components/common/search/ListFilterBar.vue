<template>
  <div>
    <v-toolbar dense flat color="#eee" class="tb">
      <v-icon small style="pointer-events: none;" class="mr-3">{{ icon }}</v-icon>
      <slot />
      <v-spacer />
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="#bbb;" @click="onClear">delete</v-icon>
        </template>
        <span>Clear Filter</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import Vue from "vue";

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
