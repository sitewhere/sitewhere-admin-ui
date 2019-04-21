<template>
  <div>
    <invocation-dialog
      ref="dialog"
      title="Invoke Device Command"
      width="600"
      resetOnOpen="true"
      createLabel="Invoke"
      cancelLabel="Cancel"
      :deviceType="deviceType"
      @payload="onCommit"
      @scheduleUpdated="onScheduleUpdated"
    />
  </div>
</template>

<script>
import InvocationDialog from "./InvocationDialog";

import {
  createCommandInvocationForAssignment,
  scheduleCommandInvocation
} from "../../rest/sitewhere-device-assignments-api";

export default {
  data: () => ({
    schedule: null
  }),

  props: ["token", "deviceType"],

  components: {
    InvocationDialog
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

    // Called if schedule selection is updated.
    onScheduleUpdated: function(schedule) {
      this.$data.schedule = schedule;
    },

    // Handle payload commit.
    onCommit: function(payload) {
      var component = this;
      if (this.schedule) {
        scheduleCommandInvocation(
          this.$store,
          this.token,
          this.schedule,
          payload
        )
          .then(function(response) {
            component.onCommitted(response);
          })
          .catch(function(e) {});
      } else {
        createCommandInvocationForAssignment(this.$store, this.token, payload)
          .then(function(response) {
            component.onCommitted(response);
          })
          .catch(function(e) {});
      }
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("invocationAdded");
    }
  }
};
</script>

<style scoped>
.add-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
