<template>
  <sw-navigation-action-button :icon="icon" :tooltip="tooltip" @action="onAction" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, NavigationIcon } from "sitewhere-ide-common";

@Component({})
export default class CustomerButton extends Vue {
  @Prop() readonly tooltip!: string;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Customer;
  }

  onAction() {
    this.$emit("action");
  }
}
</script>

<style scoped></style>
