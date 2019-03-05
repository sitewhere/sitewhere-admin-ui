<template>
  <device-status-dialog
    ref="dialog"
    title="Edit Device Status"
    width="600"
    :deviceType="deviceType"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onCommit"
  ></device-status-dialog>
</template>

<script>
import DeviceStatusDialog from "./DeviceStatusDialog";

import {
  getDeviceStatus,
  updateDeviceStatus
} from "../../rest/sitewhere-device-statuses-api";

export default {
  data: () => ({}),

  components: {
    DeviceStatusDialog
  },

  props: ["deviceType", "status"],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Send event to open dialog.
    onOpenDialog: function() {
      var component = this;
      getDeviceStatus(this.$store, this.status.token)
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
      updateDeviceStatus(this.$store, this.status.token, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("statusUpdated");
    }
  }
};
</script>

<style scoped>
</style>
