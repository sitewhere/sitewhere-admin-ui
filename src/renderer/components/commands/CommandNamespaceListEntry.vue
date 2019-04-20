<template>
  <list-entry>
    <v-card-text>
      <v-toolbar color="#363" dense dark>
        <v-toolbar-title>{{ namespace.value }}</v-toolbar-title>
      </v-toolbar>
      <v-list two-line dense>
        <div v-for="(command, index) in namespace.commands" :key="command.token">
          <v-divider v-if="index > 0"></v-divider>
          <command-panel
            :command="command"
            :deviceType="deviceType"
            @commandDeleted="onCommandDeleted"
            @commandUpdated="onCommandUpdated"
          ></command-panel>
        </div>
      </v-list>
    </v-card-text>
  </list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import ListEntry from "../common/ListEntry.vue";
import CommandPanel from "../commands/CommandPanel.vue";

import { IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    ListEntry,
    CommandPanel
  }
})
export default class CommandNamespaceListEntry extends Vue {
  @Prop() readonly namespace!: string;
  @Prop() readonly deviceType!: IDeviceType;

  // Called after command has been deleted.
  onCommandDeleted() {
    this.$emit("commandDeleted");
  }

  // Called after command has been updated.
  onCommandUpdated() {
    this.$emit("commandUpdated");
  }
}
</script>

<style scoped>
</style>
