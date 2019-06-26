<template>
  <zone-dialog
    ref="dialog"
    :area="area"
    style="display: none;"
    title="Update Zone"
    width="600"
    createLabel="Update"
    cancelLabel="Cancel"
    mode="update"
    @payload="onCommit"
  ></zone-dialog>
</template>

<script>
import ZoneDialog from "./ZoneDialog";

import { getZone, updateZone } from "../../rest/sitewhere-zones-api";

export default {
  data: () => ({}),

  components: {
    ZoneDialog
  },

  props: ["area", "token"],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Load zone information
    onOpenDialog: function() {
      var component = this;
      getZone(this.$store, this.token)
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
      updateZone(this.$store, this.token, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("updated");
    }
  }
};
</script>
