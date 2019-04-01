<template>
  <tenant-dialog
    ref="dialog"
    title="Create Tenant"
    width="600"
    resetOnOpen="true"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script>
import TenantDialog from "./TenantDialog";

import { createTenant } from "../../rest/sitewhere-tenants-api";

export default {
  data: () => ({}),

  components: {
    TenantDialog
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
      createTenant(this.$store, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("tenantAdded");
    }
  }
};
</script>

<style scoped>
</style>
