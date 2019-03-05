<template>
  <span>
    <command-dialog
      title="Edit Device Command"
      width="600"
      resetOnOpen="true"
      createLabel="Update"
      cancelLabel="Cancel"
      :deviceType="deviceType"
      @payload="onCommit"
    ></command-dialog>
  </span>
</template>

<script>
import CommandDialog from "./CommandDialog";

import {
  getDeviceCommand,
  updateDeviceCommand
} from "../../rest/sitewhere-device-commands-api";

export default {
  data: () => ({}),

  components: {
    CommandDialog
  },

  props: ["token", "deviceType"],

  methods: {
    // Send event to open dialog.
    onOpenDialog: function() {
      var component = this;
      getDeviceCommand(this.$store, this.token)
        .then(function(response) {
          component.onLoaded(response);
        })
        .catch(function(e) {});
    },

    // Called after data is loaded.
    onLoaded: function(response) {
      this.$children[0].load(response.data);
      this.$children[0].openDialog();
    },

    // Handle payload commit.
    onCommit: function(payload) {
      var component = this;
      updateDeviceCommand(this.$store, this.token, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.$children[0].closeDialog();
      this.$emit("edited");
    }
  }
};
</script>

<style scoped>
</style>
