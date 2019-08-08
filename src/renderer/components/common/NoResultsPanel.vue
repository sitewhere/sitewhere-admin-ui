<template>
  <v-card flat height="100%">
    <div class="no-results">
      <div class="no-results-content">
        <slot />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "sitewhere-ide-common";

@Component({})
export default class NoResultsPanel extends Vue {}
</script>

<style scoped>
.no-results {
  display: table;
  font-size: 20px;
  color: #666;
  text-align: center;
  width: 100%;
  height: 100%;
}
.no-results-content {
  display: table-cell;
  vertical-align: middle;
}
</style>
