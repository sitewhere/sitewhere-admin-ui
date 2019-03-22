<template>
  <v-card class="flex-rows" flat fill-height>
    <v-toolbar class="elevation-1 toolbar" dense>
      <font-awesome-icon :icon="icon" size="lg"/>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="actions"/>
    </v-toolbar>
    <div class="header">
      <slot name="header"/>
    </div>
    <div class="content">
      <slot name="content"/>
      <v-card v-if="!loaded">
        <v-card-text>
          <span class="title">{{ loadingMessage || 'Loading ...' }}</span>
          <v-progress-circular :indeterminate="true"/>
        </v-card-text>
      </v-card>
    </div>
    <div class="footer">
      <slot name="footer"/>
    </div>
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
.flex-rows {
  display: flex;
  flex-direction: column;
}
.toolbar {
  flex: 0;
  z-index: 1;
}
.header {
  flex: 0;
  background-color: #0f0;
  z-index: 1;
}
.content {
  flex: 1;
  overflow-y: auto;
  z-index: 0;
}
.footer {
  flex: 0;
  z-index: 1;
}
</style>
