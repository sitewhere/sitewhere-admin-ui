<template>
  <v-card flat color="#ffffee">
    <v-card-text class="panel-bg">
      <div style="display: flex; line-height: 1.3em;" class="subheading">
        <v-icon class="mr-2" style="font-size: 20px;">fa-exclamation-circle</v-icon>Tenant Configuration Has Unsaved Updates!
        <v-spacer />
        <v-btn class="tiny-button caption" dark outline color="#666" @click="onRevert">Revert</v-btn>
        <v-btn class="tiny-button caption ml-2" outline dark color="#090" @click="onSave">Save</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component } from "sitewhere-ide-common";

import Vue from "vue";

@Component({
  components: {}
})
export default class UnsavedUpdatesPanel extends Vue {
  /** Called when revert is clicked */
  onRevert(): void {
    this.$emit("revert");
  }

  /** Called when revert is clicked */
  onSave(): void {
    this.$emit("save");
  }
}
</script>

<style scoped>
.panel-bg {
  border-bottom: 1px solid #eed;
  border-top: 1px solid #ddd;
}
.tiny-button {
  height: 20px;
  padding: 0;
  margin: 0;
}
</style>
