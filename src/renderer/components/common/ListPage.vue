<template>
  <navigation-page :icon="icon" :title="title" :loadingMessage="loadingMessage" :loaded="loaded">
    <div slot="content">
      <slot name="filters"/>
      <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="loaded">
        <v-layout row wrap>
          <slot/>
        </v-layout>
      </v-container>
      <pager :results="results" @pagingUpdated="onPagingUpdated" :pageSizes="pageSizes"></pager>
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
import Pager from "../common/Pager.vue";

import { IPaging, IPageSizes } from "../../libraries/navigation-model";

@Component({
  components: {
    NavigationPage,
    Pager
  }
})
export default class ListPage extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly pageSizes!: IPageSizes;
  @Prop() readonly loaded!: boolean;
  @Prop() readonly results!: {}[];

  /** Update paging values and run query */
  onPagingUpdated(paging: IPaging) {
    this.$emit("pagingUpdated", paging);
  }
}
</script>

<style scoped>
</style>
