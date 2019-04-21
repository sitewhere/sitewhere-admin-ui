<template>
  <schedule-dialog
    ref="dialog"
    title="Create Schedule"
    width="600"
    resetOnOpen="true"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script>
import ScheduleDialog from "./ScheduleDialog";

import { createSchedule } from "../../rest/sitewhere-schedules-api";

export default {
  data: () => ({}),

  components: {
    ScheduleDialog
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
      console.log(payload);
      var component = this;
      createSchedule(this.$store, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("scheduleAdded");
    }
  }
};
</script>

<style scoped>
</style>
