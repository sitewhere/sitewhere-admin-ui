<template>
  <v-card class="grey lighten-3">
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component } from "sitewhere-ide-common";
import Vue from "vue";

@Component({})
export default class DialogHeader extends Vue {}
</script>
