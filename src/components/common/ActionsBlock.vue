<template>
  <span class="actions-block">
    <navigation-action-button v-if="showEdit" icon="edit" tooltip="Edit" @action="onEditClicked" />
    <navigation-action-button
      v-if="showDelete"
      icon="delete"
      tooltip="Delete"
      @action="onDeleteClicked"
    />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { NavigationActionButton } from "sitewhere-ide-components";

@Component({ components: { NavigationActionButton } })
export default class ActionsBlock extends Vue {
  @Prop({ default: true }) readonly showEdit!: boolean;
  @Prop({ default: true }) readonly showDelete!: boolean;

  /** Called after edit button is clicked */
  onEditClicked() {
    this.$emit("edit");
  }

  /** Called after delete button is clicked */
  onDeleteClicked() {
    this.$emit("delete");
  }
}
</script>
