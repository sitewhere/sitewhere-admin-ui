<template>
  <span>
    <sw-delete-dialog
      ref="dialog"
      title="Delete Asset Type"
      width="400"
      :error="error"
      @delete="onDeleteConfirmed"
    >
      <v-card-text>Are you sure you want to delete this asset type?</v-card-text>
    </sw-delete-dialog>
  </span>
</template>

<script>
import { deleteAssetType } from "../../rest/sitewhere-asset-types-api";

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
      deleteAssetType(this.$store, this.token, true)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("assetTypeDeleted");
    }
  }
};
</script>
