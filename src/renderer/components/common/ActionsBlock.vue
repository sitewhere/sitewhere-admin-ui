<template>
  <span class="actions-block">
    <navigation-action-button v-if="showEdit" icon="edit" tooltip="Edit" @action="onEditClicked"/>
    <navigation-action-button
      v-if="showDelete"
      icon="times"
      tooltip="Delete"
      @action="onDeleteClicked"
    />
  </span>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import NavigationActionButton from "../common/NavigationActionButton.vue";

@Component({
  components: {
    NavigationActionButton
  }
})
export default class ActionsBlock extends Vue {
  @Prop({ default: true }) readonly showEdit!: boolean;
  @Prop({ default: true }) readonly showDelete!: boolean;

  // Called after create button is clicked.
  onEditClicked(e: any) {
    this.$emit("edit");
  }

  // Called after create button is clicked.
  onDeleteClicked(e: any) {
    this.$emit("delete");
  }
}
</script>

<style scoped>
</style>
