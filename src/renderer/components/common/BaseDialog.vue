<template>
  <v-dialog v-model="visible" persistent :width="width" :lazy="true">
    <v-card>
      <v-toolbar dense flat card dark class="mb-0" color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <error-banner :error="error"></error-banner>
      <v-card-text class="pa-0">
        <slot>
          <div>Your content goes here!</div>
        </slot>
      </v-card-text>
      <v-card-actions v-if="!hideButtons">
        <v-spacer></v-spacer>
        <v-btn class="grey--text darken-1" flat="flat" @click="onCancelClicked">{{cancelLabel}}</v-btn>
        <v-btn
          v-if="!hideCreate"
          :disabled="invalid"
          class="blue--text darken-1"
          flat="flat"
          @click="onCreateClicked"
        >{{createLabel}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import ErrorBanner from "../common/ErrorBanner.vue";

@Component({
  components: {
    ErrorBanner
  }
})
export default class BaseDialog extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly visible: boolean = false;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly error!: string;
  @Prop() readonly hideButtons!: boolean;
  @Prop() readonly hideCreate!: boolean;
  @Prop() readonly invalid!: boolean;

  // Called when create button is clicked.
  onCancelClicked(e: any) {
    this.$emit("cancelClicked", e);
  }

  // Called when create button is clicked.
  onCreateClicked(e: any) {
    this.$emit("createClicked", e);
  }
}
</script>

<style scoped>
</style>
