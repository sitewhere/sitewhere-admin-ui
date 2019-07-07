<template>
  <v-treeview
    ref="tree"
    :selectable="selectable"
    :items="tree"
    item-children="children"
    item-key="token"
    item-text="name"
    v-model="selected"
  />
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";
import { ITreeNode } from "sitewhere-rest-api";

@Component({})
export default class TreeNodePanel extends Vue {
  @Prop() readonly tree!: ITreeNode[];
  @Prop({ default: false }) readonly selectable!: boolean;

  selected: string[] = [];
}
</script>
