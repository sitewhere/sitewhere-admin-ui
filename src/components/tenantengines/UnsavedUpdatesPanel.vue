<template>
  <v-card flat color="#ffffee">
    <v-card-text>
      <div style="display: flex;">
        <v-icon class="mr-2" style="font-size: 20px;">fa-exclamation-circle</v-icon>
        <span class="subtitle-2 mt-1">Tenant Configuration Has Unsaved Updates!</span>
        <v-spacer />
        <v-btn small class="caption" dark outlined color="#666" @click="onRevert">Revert</v-btn>
        <v-btn small class="caption ml-2" outlined dark color="#090" @click="onSave">Save</v-btn>
      </div>
    </v-card-text>
    <v-divider />
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

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
