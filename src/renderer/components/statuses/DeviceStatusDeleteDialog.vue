<template>
  <delete-dialog
    title="Delete Device Status"
    width="400"
    :error="error"
    @delete="onDeleteConfirmed"
  >
    <v-card-text>Are you sure you want to delete this device status?</v-card-text>
  </delete-dialog>
</template>

<script>
import DeleteDialog from "../common/DeleteDialog";

import { deleteDeviceStatus } from "../../rest/sitewhere-device-statuses-api";

export default {
  data: () => ({
    error: null
  }),

  props: ["deviceType", "status"],

  components: {
    DeleteDialog
  },

  methods: {
    // Show delete dialog.
    showDeleteDialog: function() {
      this.$children[0].openDialog();
    },

    // Perform delete.
    onDeleteConfirmed: function() {
      var component = this;
      deleteDeviceStatus(this.$store, this.deviceType.token, this.code)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.$children[0].closeDialog();
      this.$emit("statusDeleted");
    }
  }
};
</script>

<style scoped>
</style>
