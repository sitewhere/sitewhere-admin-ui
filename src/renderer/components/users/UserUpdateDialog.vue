<template>
  <span>
    <user-dialog
      ref="dialog"
      title="Edit User"
      width="700"
      createLabel="Update"
      cancelLabel="Cancel"
      @payload="onCommit"
    ></user-dialog>
  </span>
</template>

<script>
import UserDialog from "./UserDialog";

import { getUser, updateUser } from "../../rest/sitewhere-users-api";

export default {
  data: () => ({}),

  components: {
    UserDialog
  },

  props: ["username"],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Send event to open dialog.
    onOpenDialog: function() {
      var component = this;
      getUser(this.$store, this.username)
        .then(function(response) {
          component.onLoaded(response);
        })
        .catch(function(e) {});
    },

    // Called after data is loaded.
    onLoaded: function(response) {
      this.getDialogComponent().load(response.data);
      this.getDialogComponent().openDialog();
    },

    // Handle payload commit.
    onCommit: function(payload) {
      var component = this;
      updateUser(this.$store, this.username, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("edited");
    }
  }
};
</script>

<style scoped>
</style>
