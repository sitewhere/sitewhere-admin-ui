<template>
  <v-list-tile avatar @click="onUpdateCommand">
    <v-list-tile-content>
      <command-html :command="command"/>
    </v-list-tile-content>
    <v-list-tile-action>
      <actions-block @edit="onUpdateCommand" @delete="onDeleteCommand"/>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import ActionsBlock from "../common/ActionsBlock";
import CommandHtml from "./CommandHtml";
import CommandDeleteDialog from "./CommandDeleteDialog";
import CommandUpdateDialog from "./CommandUpdateDialog";

export default {
  data: () => ({}),

  components: {
    ActionsBlock,
    CommandHtml,
    CommandDeleteDialog,
    CommandUpdateDialog
  },

  props: ["command"],

  methods: {
    // Called after command has been updated.
    onUpdateCommand: function() {
      this.$emit("edit", this.command);
    },

    // Called after command has been deleted.
    onDeleteCommand: function() {
      this.$emit("delete", this.command);
    }
  }
};
</script>

<style scoped>
.command-comment {
  font-family: "courier";
}
</style>
