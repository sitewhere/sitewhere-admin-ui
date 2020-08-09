<template>
  <v-app-bar flat dark dense color="primary" class="tb" height="38">
    <slot name="icon" />
    <v-toolbar-title class="white--text body-2 ml-2">
      {{
      title
      }}
    </v-toolbar-title>
    <slot name="left" />
    <v-spacer />
    <slot />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class CondensedToolbar extends Vue {
  @Prop() readonly title!: string;
}
</script>

<style scoped>
.tb >>> .v-toolbar__content {
  padding: 0 10px;
}
</style>
