<template>
  <v-tab-item :key="tabkey" :id="id">
    <div class="flex-rows">
      <div class="tab-header">
        <slot name="header"/>
      </div>
      <div class="tab-content">
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              :headers="headers"
              :items="matches"
              :hide-actions="true"
              :no-data-text="noDataText"
              :style="tableStyle"
            >
              <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"/>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </div>
      <div class="tab-footer">
        <pager :results="results" @pagingUpdated="onPagingUpdated" :pageSizes="pageSizes"/>
      </div>
    </div>
    <loading-overlay v-if="!loaded" :loadingMessage="loadingMessage"/>
    <slot name="dialogs"></slot>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import Pager from "./Pager.vue";
import LoadingOverlay from "./LoadingOverlay.vue";

import { IPaging, IPageSizes, ITableHeaders } from "sitewhere-ide-common";

@Component({
  components: {
    Pager,
    LoadingOverlay
  }
})
export default class DataTableTab extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly headers!: ITableHeaders;
  @Prop() readonly pageSizes!: IPageSizes;
  @Prop() readonly noDataText!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
  @Prop() readonly results!: { numResults: number; results: {}[] };

  /** Get current matches */
  get matches(): {}[] {
    return this.results ? this.results.results : [];
  }

  /** Dims results when loading */
  get tableStyle(): {} {
    return { opacity: this.loaded ? 1.0 : 0.3 };
  }

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
.tab-header {
  flex: 0;
}
.tab-content {
  flex: 1;
  background-color: #eee;
  overflow-y: auto;
}
.tab-footer {
  flex: 0;
}
</style>
