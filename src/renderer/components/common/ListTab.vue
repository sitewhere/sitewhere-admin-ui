<template>
  <v-tabs-content :key="key" :id="id">
    <slot name="filters"/>
    <v-container fluid grid-list-md style="background-color: #f5f5f5;" v-if="loaded">
      <v-layout row wrap>
        <slot/>
      </v-layout>
    </v-container>
    <v-card v-else>
      <v-card-text>
        <span class="title">{{ loadingMessage || 'Loading ...' }}</span>
        <v-progress-circular :indeterminate="true"/>
      </v-card-text>
    </v-card>
    <pager :results="results" @pagingUpdated="onPagingUpdated" :pageSizes="pageSizes">
      <slot name="no-results"/>
    </pager>
    <slot name="dialogs"></slot>
  </v-tabs-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import Pager from "../common/Pager.vue";

import { IPaging, IPageSizes } from "../../libraries/navigation-model";

@Component({
  components: {
    Pager
  }
})
export default class ListPage extends Vue {
  @Prop() readonly key!: string;
  @Prop() readonly id!: string;
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
