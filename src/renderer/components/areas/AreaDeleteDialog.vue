<template>
  <span>
    <sw-delete-dialog title="Delete Area" width="400" :error="error" @delete="onDeleteConfirmed">
      <v-card-text>Are you sure you want to delete this area?</v-card-text>
    </sw-delete-dialog>
  </span>
</template>

<script>
import { deleteArea } from "../../rest/sitewhere-areas-api";

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
      deleteArea(this.$store, this.token, true)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.$children[0].closeDialog();
      this.$emit("areaDeleted");
    }
  }
};
</script>
