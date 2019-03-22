<template>
  <navigation-page :icon="icon" :title="title" :loadingMessage="loadingMessage" :loaded="loaded">
    <template slot="content">
      <div class="flex-rows">
        <div class="list-filters">
          <slot name="filters"/>
        </div>
        <div class="list-content">
          <v-container fluid grid-list-md style class="pa-2" v-if="loaded">
            <v-layout row wrap>
              <slot/>
            </v-layout>
          </v-container>
        </div>
      </div>
    </template>
    <template slot="footer">
      <pager :results="results" @pagingUpdated="onPagingUpdated" :pageSizes="pageSizes"/>
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
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.list-filters {
  flex: 0;
  background-color: #f00;
}
.list-content {
  flex: 1;
  background-color: #eee;
}
</style>
