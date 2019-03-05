<template>
  <div>
    <location-dialog
      ref="dialog"
      title="Create Location Event"
      width="600"
      createLabel="Create"
      cancelLabel="Cancel"
      @payload="onCommit"
    ></location-dialog>
  </div>
</template>

<script>
import LocationDialog from "./LocationDialog";

import { createLocationForAssignment } from "../../rest/sitewhere-device-assignments-api";

export default {
  data: () => ({}),

  props: ["token"],

  components: {
    LocationDialog
  },

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Loads the component from a json payload.
    load: function(payload) {
      this.getDialogComponent().load(payload);
    },

    // Send event to open dialog.
    onOpenDialog: function() {
      this.getDialogComponent().reset();
      this.getDialogComponent().openDialog();
    },

    // Handle payload commit.
    onCommit: function(payload) {
      var component = this;
      createLocationForAssignment(this.$store, this.token, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("locationAdded");
    }
  }
};
</script>

<style scoped>
</style>
