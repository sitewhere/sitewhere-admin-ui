<template>
  <v-card class="list-entry" flat hover>
    <slot/>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "sitewhere-ide-common";

@Component
export default class ListEntry extends Vue {}
</script>

<style scoped>
.list-entry {
  border: 1px solid #ddd;
}
</style>
