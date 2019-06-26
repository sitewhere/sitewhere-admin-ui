<template>
  <sw-delete-dialog title="Delete Zone" width="400" :error="error" @delete="onDeleteConfirmed">
    <v-card-text>
      <v-card-text>Are you sure you want to delete this zone?</v-card-text>
    </v-card-text>
  </sw-delete-dialog>
</template>

<script>
import { deleteZone } from "../../rest/sitewhere-zones-api";

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
      deleteZone(this.$store, this.token)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.$children[0].closeDialog();
      this.$emit("deleted");
    }
  }
};
</script>
