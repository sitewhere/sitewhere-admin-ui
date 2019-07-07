<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card flat>
        <div class="no-results" :style="noResultsStyle">{{text}}</div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({})
export default class NoResultsPanel extends Vue {
  @Prop() readonly text!: string;
  @Prop() readonly minHeight!: string;
  @Prop() readonly fontSize!: string;
  @Prop() readonly padding!: string;

  get noResultsStyle() {
    return {
      "min-height": this.defaultedMinHeight,
      "font-size": this.defaultedFontSize,
      padding: this.defaultedPadding
    };
  }

  // Minimum height with default fallback.
  get defaultedMinHeight() {
    if (this.minHeight) {
      return this.minHeight;
    }
    return "100px";
  }

  // Font size with default fallback.
  get defaultedFontSize() {
    if (this.fontSize) {
      return this.fontSize;
    }
    return "20px";
  }

  // Padding with default fallback.
  get defaultedPadding() {
    if (this.padding) {
      return this.padding;
    }
    return "40px";
  }
}
</script>

<style scoped>
.no-results {
  text-align: center;
}
</style>
