<template>
  <v-dialog v-model="visible" persistent :width="width">
    <v-card>
      <v-toolbar dense flat card dark color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-alert
        class="ma-0"
        error
        v-bind:value="true"
        style="width: 100%"
        slot="error"
        v-if="error"
      >{{error}}</v-alert>
      <v-card-text class="pa-0">
        <slot>
          <div>Your content goes here!</div>
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline color="primary" @click="onCancelClicked">Cancel</v-btn>
        <v-btn color="primary" @click="onDeleteClicked">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import ErrorBanner from "../common/ErrorBanner.vue";

@Component({
  components: {
    ErrorBanner
  }
})
export default class DeleteDialog extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly error!: string;
  @Prop({ default: false }) readonly visible!: boolean;

  // Called after create button is clicked.
  onDeleteClicked(e: any) {
    this.$emit("delete");
  }

  // Called after cancel button is clicked.
  onCancelClicked(e: any) {
    this.$emit("cancel");
  }
}
</script>

<style scoped>
</style>
