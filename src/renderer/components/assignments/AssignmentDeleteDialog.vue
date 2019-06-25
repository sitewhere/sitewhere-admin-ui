<template>
  <sw-delete-dialog
    title="Delete Assignment"
    width="400"
    :error="error"
    @delete="onDeleteConfirmed"
  >
    <v-card-text>Are you sure you want to delete this assignment?</v-card-text>
  </sw-delete-dialog>
</template>

<script>
import { deleteDeviceAssignment } from "../../rest/sitewhere-device-assignments-api";

export default {
  data: () => ({
    error: null
  }),

  props: ["token"],

  methods: {
    // Show delete dialog.
    showDeleteDialog: function() {
      this.$children[0].openDialog();
    },

    // Perform delete.
    onDeleteConfirmed: function() {
      var component = this;
      deleteDeviceAssignment(this.$store, this.token, true)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.$children[0].closeDialog();
      this.$emit("assignmentDeleted");
    }
  }
};
</script>
