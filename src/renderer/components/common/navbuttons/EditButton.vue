<template>
  <sw-navigation-action-button material="true" :icon="icon" :tooltip="tooltip" @action="onAction"/>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";
import { NavigationIcon } from "../../../libraries/constants";

@Component({})
export default class EditButton extends Vue {
  @Prop() readonly tooltip!: string;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Edit;
  }

  onAction() {
    this.$emit("action");
  }
}
</script>

<style scoped>
</style>
