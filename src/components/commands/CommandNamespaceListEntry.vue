<template>
  <list-entry>
    <v-toolbar flat color="#363" dense dark>
      <v-toolbar-title>{{ namespace.value }}</v-toolbar-title>
    </v-toolbar>
    <v-list two-line dense>
      <div v-for="(command, index) in namespace.commands" :key="command.token">
        <v-divider v-if="index > 0"></v-divider>
        <command-panel :command="command" @edit="onEditCommand" @delete="onDeleteCommand" />
      </div>
    </v-list>
  </list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { ListEntry } from "sitewhere-ide-components";
import CommandPanel from "../commands/CommandPanel.vue";

import { IDeviceCommand, IDeviceCommandNamespace } from "sitewhere-rest-api";

@Component({
  components: {
    ListEntry,
    CommandPanel
  }
})
export default class CommandNamespaceListEntry extends Vue {
  @Prop() readonly namespace!: IDeviceCommandNamespace;

  // Called to edit command.
  onEditCommand(command: IDeviceCommand) {
    this.$emit("edit", command);
  }

  // Called to edit command.
  onDeleteCommand(command: IDeviceCommand) {
    this.$emit("delete", command);
  }
}
</script>
