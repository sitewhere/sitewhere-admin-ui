<template>
  <v-container fluid class="pa-3">
    <v-layout class="pl-2 pr-2 pt-0 pb-0" row wrap>
      <slot />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "sitewhere-ide-common";

@Component({})
export default class DialogForm extends Vue {}
</script>
