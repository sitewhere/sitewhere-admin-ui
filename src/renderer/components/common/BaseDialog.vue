<template>
  <v-dialog v-model="visible" persistent :width="width">
    <v-card>
      <v-toolbar dense flat card dark class="mb-0" color="primary">
        <v-toolbar-title>
          <v-icon class="mr-1">{{ icon }}</v-icon>
          {{title}}
        </v-toolbar-title>
      </v-toolbar>
      <error-banner :error="error"></error-banner>
      <v-card-text class="pa-0">
        <v-tabs v-model="active">
          <slot name="tabs"/>
        </v-tabs>
        <v-tabs-items v-model="active">
          <slot name="tab-items"/>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions v-if="!hideButtons">
        <v-spacer></v-spacer>
        <v-btn outline color="primary" @click="onCancelClicked">{{cancelLabel}}</v-btn>
        <v-btn
          color="primary"
          v-if="!hideCreate"
          :disabled="invalid"
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
import { ITabbedComponent } from "../../libraries/navigation-model";
import { NavigationIcon } from "../../libraries/constants";

@Component({
  components: {
    ErrorBanner
  }
})
export default class BaseDialog extends Vue implements ITabbedComponent {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop({ default: NavigationIcon.Device }) readonly icon!: NavigationIcon;
  @Prop({ default: true }) readonly visible!: boolean;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly error!: string;
  @Prop() readonly hideButtons!: boolean;
  @Prop() readonly hideCreate!: boolean;
  @Prop() readonly invalid!: boolean;

  active: string | null = null;

  /** Set the active tab */
  setActiveTab(tab: string): void {
    this.active = tab;
  }

  /** Handle cancel clicked */
  onCancelClicked(e: any) {
    this.$emit("cancelClicked", e);
  }

  /** Handle create clicked */
  onCreateClicked(e: any) {
    this.$emit("createClicked", e);
  }
}
</script>

<style scoped>
</style>
