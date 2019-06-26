<template>
  <span>
    <sw-delete-dialog
      ref="dialog"
      title="Delete Command"
      width="400"
      :error="error"
      @delete="onDeleteConfirmed"
    >
      <v-card-text>Are you sure you want to delete this device command?</v-card-text>
    </sw-delete-dialog>
  </span>
</template>

<script>
import { deleteDeviceCommand } from "../../rest/sitewhere-device-commands-api";

export default {
  data: () => ({
    error: null
  }),

  props: ["token"],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Show delete dialog.
    showDeleteDialog: function() {
      this.getDialogComponent().openDialog();
    },

    // Perform delete.
    onDeleteConfirmed: function() {
      var component = this;
      deleteDeviceCommand(this.$store, this.token, true)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("deleted");
    }
  }
};
</script>

<style scoped>
</style>
