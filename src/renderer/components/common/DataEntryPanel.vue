<template>
  <v-container fluid>
    <v-layout row wrap>
      <slot/>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class DataEntryPanel extends Vue {}
</script>

<style scoped>
</style>
