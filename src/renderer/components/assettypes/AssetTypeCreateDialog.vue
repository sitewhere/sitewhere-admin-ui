<template>
  <div>
    <asset-type-dialog
      ref="dialog"
      title="Create Asset Type"
      width="600"
      resetOnOpen="true"
      createLabel="Create"
      cancelLabel="Cancel"
      @payload="onCommit"
    ></asset-type-dialog>
  </div>
</template>

<script>
import FloatingActionButton from "../common/FloatingActionButton";
import AssetTypeDialog from "./AssetTypeDialog";

import { createAssetType } from "../../rest/sitewhere-asset-types-api";

export default {
  data: () => ({}),

  components: {
    AssetTypeDialog,
    FloatingActionButton
  },

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Send event to open dialog.
    onOpenDialog: function() {
      this.getDialogComponent().reset();
      this.getDialogComponent().openDialog();
    },

    // Handle payload commit.
    onCommit: function(payload) {
      var component = this;
      createAssetType(this.$store, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("assetTypeAdded");
    }
  }
};
</script>

<style scoped>
</style>
