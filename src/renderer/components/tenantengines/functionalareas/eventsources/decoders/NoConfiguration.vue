<template>
  <v-card flat
    ><v-card-text class="padded-message subheading"
      >This decoder has no configurable attributes.</v-card-text
    ></v-card
  >
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "sitewhere-ide-common";

@Component({})
export default class NoConfiguration extends Vue {}
</script>

<style scoped>
.padded-message {
  padding: 50px;
  text-align: center;
}
</style>
