<template>
  <div class="overlay">
    <v-container fill-height>
      <v-layout align-center justify-center column fill-height>
        <v-flex xs5/>
        <v-flex xs1>
          <v-progress-circular size="65" color="#666" class="mb-4" :indeterminate="true"/>
        </v-flex>
        <v-flex xs1>
          <div class="subheading" style="color: #666;">{{ loadingMessage || 'Loading ...' }}</div>
        </v-flex>
        <v-flex xs5/>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import Vue from "vue";

@Component({})
export default class LoadingOverlay extends Vue {
  @Prop() readonly loadingMessage!: string;
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
