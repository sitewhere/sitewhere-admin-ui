<template>
  <v-card class="grey lighten-3 black--text pa-0">
    <slot v-if="results && results.numResults === 0" name="noresults"></slot>
    <v-divider></v-divider>
    <v-container class="ma-0 pa-0">
      <v-layout row wrap>
        <v-flex xs2>
          <v-subheader class="ma-0 pt-0 pr-0">Rows per page</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-btn-toggle v-model="pageSize" class="mt-1">
            <v-btn
              flat
              :value="entry.value"
              v-for="entry in pageSizesWithDefaults"
              :key="entry.value"
            >{{ entry.text }}</v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex xs4>
          <v-tooltip top>
            <v-btn
              :disabled="!previousEnabled"
              icon
              light
              class="ml-0 mr-0"
              @click="onFirstPage"
              slot="activator"
            >
              <font-awesome-icon class="grey--text text--darken-1" icon="fast-backward" size="lg"/>
            </v-btn>
            <span>First Page</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn
              :disabled="!previousEnabled"
              icon
              light
              class="ml-0 mr-0"
              @click="onPreviousPage"
              slot="activator"
            >
              <font-awesome-icon class="grey--text text--darken-1" icon="backward" size="lg"/>
            </v-btn>
            <span>Previous Page</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn icon light class="ml-0 mr-0" @click="onRefresh" slot="activator">
              <font-awesome-icon class="grey--text text--darken-1" icon="sync" size="lg"/>
            </v-btn>
            <span>Refresh</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn
              :disabled="!nextEnabled"
              icon
              light
              class="ml-0 mr-0"
              @click="onNextPage"
              slot="activator"
            >
              <font-awesome-icon class="grey--text text--darken-1" icon="forward" size="lg"/>
            </v-btn>
            <span>Next Page</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn
              :disabled="!nextEnabled"
              icon
              light
              class="ml-0 mr-0"
              @click="onLastPage"
              slot="activator"
            >
              <font-awesome-icon class="grey--text text--darken-1" icon="fast-forward" size="lg"/>
            </v-btn>
            <span>Last Page</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs3>
          <v-subheader class="ma-0 pt-0 right">{{ description }}</v-subheader>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import { IPaging, IPageSizes } from "../../libraries/navigation-model";

@Component
export default class Pager extends Vue {
  @Prop() readonly results!: { numResults: number; results: {}[] };
  @Prop() readonly pageSizes!: IPageSizes;

  page: number = 1;
  pageSize: number | null = null;
  defaultResults: { numResults: number; results: {}[] } = {
    numResults: 0,
    results: []
  };
  defaultPageSizes: IPageSizes = [
    {
      text: "10",
      value: 10
    },
    {
      text: "25",
      value: 25
    },
    {
      text: "50",
      value: 50
    }
  ];

  created() {
    if (!this.pageSize) {
      this.pageSize = this.pageSizesWithDefaults[0].value;
    }
    this.onPagingUpdated();
  }

  // Refresh results on page size updated.
  @Watch("pageSize") onPageSizeUpdated(val: number, oldVal: number) {
    this.page = 1;
    this.onPagingUpdated();
  }

  // Results with defaults fallback.
  get resultsWithDefaults(): { numResults: number; results: {}[] } {
    return this.results || this.defaultResults;
  }

  // Total record count.
  get total(): number {
    return this.resultsWithDefaults.numResults;
  }

  // Description.
  get description(): string {
    let size = this.pageSize || 0;
    let total = this.total;
    let page = this.page;
    var first = size * (page - 1) + 1;
    var last = Math.min(total, first + size - 1);
    return "" + first + "-" + last + " of " + total;
  }

  // Calculate number of pages.
  get pageCount() {
    var results = this.resultsWithDefaults;
    var total = results.numResults;
    var size = this.pageSize || 0;
    var mod = total % size;
    var count = (total / size) | 0;
    count += mod > 0 ? 1 : 0;
    return count;
  }

  // Get list of available page sizes with fallback defaults.
  get pageSizesWithDefaults(): { text: string; value: number }[] {
    return this.pageSizes || this.defaultPageSizes;
  }

  // Indicates if 'first' button should be enabled.
  get previousEnabled(): boolean {
    return this.page > 1;
  }

  // Indicates if 'first' button should be enabled.
  get nextEnabled(): boolean {
    return this.page < this.pageCount;
  }

  // Called to move to first page.
  onFirstPage() {
    if (this.page !== 1) {
      this.page = 1;
      this.onPagingUpdated();
    }
  }

  // Called to move to previous page.
  onPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.onPagingUpdated();
    }
  }

  // Called to refresh data.
  onRefresh() {
    this.onPagingUpdated();
  }

  // Called to move to next page.
  onNextPage() {
    if (this.page < this.pageCount) {
      this.page++;
      this.onPagingUpdated();
    }
  }

  // Called to move to last page.
  onLastPage() {
    if (this.page < this.pageCount) {
      this.page = this.pageCount;
      this.onPagingUpdated();
    }
  }

  // Called when paging values are updated.
  onPagingUpdated() {
    var paging: IPaging = {
      pageNumber: this.page,
      pageSize: this.pageSize || 0
    };
    this.$emit("pagingUpdated", paging);
  }
}
</script>

<style scoped>
</style>
