<template>
  <v-tab-item :key="tabkey" :id="id">
    <div class="flex-rows">
      <div class="list-filters">
        <slot name="filters"/>
      </div>
      <div class="list-content">
        <slot v-if="loaded"/>
        <v-card v-else>
          <v-card-text>
            <span class="title">{{ loadingMessage || 'Loading ...' }}</span>
            <v-progress-circular :indeterminate="true"/>
          </v-card-text>
        </v-card>
      </div>
      <div class="list-footer">
        <pager :results="results" @pagingUpdated="onPagingUpdated" :pageSizes="pageSizes"/>
      </div>
    </div>
    <slot name="dialogs"></slot>
  </v-tab-item>
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
export default class ListTab extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly pageSizes!: IPageSizes;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
  @Prop() readonly results!: { numResults: number; results: {}[] };

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
  overflow-y: auto;
}
.list-footer {
  flex: 0;
}
</style>
