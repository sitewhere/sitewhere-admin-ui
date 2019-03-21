<template>
  <v-card>
    <v-toolbar class="elevation-1" dense>
      <font-awesome-icon :icon="icon" size="lg"/>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="actions"></slot>
    </v-toolbar>
    <slot name="content"></slot>
    <v-card v-if="!loaded">
      <v-card-text>
        <span class="title">{{ loadingMessage || 'Loading ...' }}</span>
        <v-progress-circular :indeterminate="true"/>
      </v-card-text>
    </v-card>
    <slot name="footer"></slot>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class NavigationPage extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
}
</script>

<style scoped>
</style>
