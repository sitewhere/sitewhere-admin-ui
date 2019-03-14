<template>
  <navigation-page :icon="icon" :title="title" :loadingMessage="loadingMessage" :loaded="loaded">
    <div v-if="record" slot="content">
      <slot name="header"></slot>
      <slot/>
      <slot name="dialogs"></slot>
    </div>
    <div slot="actions">
      <slot name="actions"></slot>
    </div>
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
