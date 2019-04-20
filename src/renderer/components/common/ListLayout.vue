<template>
  <v-container class="pa-2" fluid grid-list-md fill-height>
    <v-layout align-content-start row wrap>
      <slot/>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component } from "sitewhere-ide-common";

import Vue from "vue";

@Component({})
export default class ListLayout extends Vue {}
</script>

<style scoped>
</style>
