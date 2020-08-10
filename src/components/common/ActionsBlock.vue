<template>
  <div class="actions-block">
    <span class="edit-button">
      <edit-button v-if="showEdit" tooltip="Edit" @action="onEditClicked" />
    </span>
    <span class="delete-button">
      <delete-button v-if="showDelete" tooltip="Delete" @action="onDeleteClicked" />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import EditButton from "./navbuttons/EditButton.vue";
import DeleteButton from "./navbuttons/DeleteButton.vue";

@Component({ components: { EditButton, DeleteButton } })
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

<style scoped>
.actions-block {
  position: relative;
  width: 55px;
}
.edit-button {
  position: absolute;
  left: 0;
}
.delete-button {
  position: absolute;
  right: 0;
}
</style>