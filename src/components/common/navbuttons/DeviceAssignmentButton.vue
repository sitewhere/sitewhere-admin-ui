<template>
  <navigation-action-button icon="fa-link" :tooltip="tooltip" @action="onAction" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { NavigationActionButton } from "sitewhere-ide-components";

@Component({ components: { NavigationActionButton } })
export default class DeviceAssignmentButton extends Vue {
  @Prop() readonly tooltip!: string;

  onAction() {
    this.$emit("action");
  }
}
</script>