<template>
  <device-status-dialog
    ref="dialog"
    :deviceType="deviceType"
    title="Create Device Status"
    width="600"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script>
import DeviceStatusDialog from "./DeviceStatusDialog";

import { createDeviceStatus } from "../../rest/sitewhere-device-statuses-api";

export default {
  data: () => ({}),

  components: {
    DeviceStatusDialog
  },

  props: ["deviceType"],

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
      createDeviceStatus(this.$store, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("statusAdded");
    }
  }
};
</script>

<style scoped>
</style>
