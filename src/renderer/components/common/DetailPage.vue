<template>
  <navigation-page :icon="icon" :title="title" :loadingMessage="loadingMessage" :loaded="loaded">
    <template slot="header">
      <slot name="header"></slot>
    </template>
    <template v-if="record" slot="content">
      <slot/>
    </template>
    <template slot="actions">
      <slot name="actions"></slot>
    </template>
    <slot name="dialogs"></slot>
  </navigation-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import NavigationPage from "../common/NavigationPage.vue";

@Component({
  components: {
    NavigationPage
  }
})
export default class DetailPage extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
  @Prop() readonly record!: {};
}
</script>

<style scoped>
</style>
