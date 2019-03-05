<template>
  <div>
    <device-group-dialog
      ref="dialog"
      title="Edit Device Group"
      width="700"
      createLabel="Update"
      cancelLabel="Cancel"
      @payload="onCommit"
    ></device-group-dialog>
  </div>
</template>

<script>
import DeviceGroupDialog from "./DeviceGroupDialog";

import {
  getDeviceGroup,
  updateDeviceGroup
} from "../../rest/sitewhere-device-groups-api";

export default {
  data: () => ({}),

  components: {
    DeviceGroupDialog
  },

  props: ["token"],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Send event to open dialog.
    onOpenDialog: function() {
      var component = this;
      getDeviceGroup(this.$store, this.token)
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
      updateDeviceGroup(this.$store, this.token, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("groupUpdated");
    }
  }
};
</script>

<style scoped>
</style>
