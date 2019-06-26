<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Schedule"
    width="400"
    :error="error"
    @delete="onDeleteConfirmed"
  >
    <v-card-text>Are you sure you want to delete this schedule?</v-card-text>
  </sw-delete-dialog>
</template>

<script>
import { deleteSchedule } from "../../rest/sitewhere-schedules-api";

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
      deleteSchedule(this.$store, this.token, true)
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
