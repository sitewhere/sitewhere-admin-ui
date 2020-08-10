<template>
  <list-entry class="pa-2">
    <v-list-item>
      <v-list-item-content>
        <command-html :command="command" />
      </v-list-item-content>
      <v-list-item-action>
        <actions-block @edit="onUpdateCommand" @delete="onDeleteCommand" />
      </v-list-item-action>
    </v-list-item>
  </list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import CommandHtml from "./CommandHtml.vue";
import ActionsBlock from "../common/ActionsBlock.vue";

import { ListEntry } from "sitewhere-ide-components";

import { IDeviceCommand } from "sitewhere-rest-api";

@Component({
  components: {
    ListEntry,
    CommandHtml,
    ActionsBlock
  }
})
export default class CommandPanel extends Vue {
  @Prop() readonly command!: IDeviceCommand;

  // Called after command has been updated.
  onUpdateCommand() {
    this.$emit("edit", this.command);
  }

  // Called after command has been deleted.
  onDeleteCommand() {
    this.$emit("delete", this.command);
  }
}
</script>

<style scoped>
.command-comment {
  font-family: "courier";
}
</style>
