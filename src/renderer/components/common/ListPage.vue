<template>
  <navigation-page :icon="icon" :title="title" :loadingMessage="loadingMessage" :loaded="loaded">
    <template slot="content">
      <div class="flex-rows">
        <div class="list-filters">
          <slot name="filters"/>
        </div>
        <div class="list-content">
          <slot/>
        </div>
      </div>
    </template>
    <template slot="footer">
      <pager :results="results" @pagingUpdated="onPagingUpdated" :pageSizes="pageSizes"/>
    </template>
    <template slot="actions">
      <slot name="actions"/>
    </template>
    <template slot="dialogs">
      <slot name="dialogs"/>
    </template>
  </navigation-page>
</template>

<script lang="ts">
import Vue from "vue";

import NavigationPage from "../common/NavigationPage.vue";
import Pager from "../common/Pager.vue";

import { Component, Prop, IPaging, IPageSizes } from "sitewhere-ide-common";

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
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.list-filters {
  flex: 0;
}
.list-content {
  flex: 1;
  background-color: #eee;
}
</style>
