<template>
  <navigation-action-button :icon="icon" :tooltip="tooltip" @action="onAction" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import { NavigationActionButton } from "sitewhere-ide-components";

@Component({ components: { NavigationActionButton } })
export default class AddButton extends Vue {
  @Prop() readonly tooltip!: string;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.Add;
  }

  onAction() {
    this.$emit("action");
  }
}
</script>