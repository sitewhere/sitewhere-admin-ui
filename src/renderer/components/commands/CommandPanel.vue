<template>
  <sw-list-entry class="pa-2">
    <v-list-tile avatar>
      <v-list-tile-content>
        <command-html :command="command" />
      </v-list-tile-content>
      <v-list-tile-action>
        <actions-block @edit="onUpdateCommand" @delete="onDeleteCommand" />
      </v-list-tile-action>
    </v-list-tile>
  </sw-list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import CommandHtml from "./CommandHtml.vue";
import ActionsBlock from "../common/ActionsBlock.vue";

import { IDeviceCommand } from "sitewhere-rest-api";

@Component({
  components: {
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
