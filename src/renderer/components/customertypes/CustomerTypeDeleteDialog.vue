<template>
  <span>
    <sw-delete-dialog
      ref="dialog"
      title="Delete Customer Type"
      width="400"
      :error="error"
      @delete="onDeleteConfirmed"
    >
      <v-card-text>Are you sure you want to delete this customer type?</v-card-text>
    </sw-delete-dialog>
  </span>
</template>

<script>
import { deleteCustomerType } from "../../rest/sitewhere-customer-types-api";

export default {
  data: () => ({
    error: null
  }),

  props: ["token"],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function() {
      return this.$refs["dialog"];
    },

    // Show delete dialog.
    showDeleteDialog: function() {
      this.getDialogComponent().openDialog();
    },

    // Perform delete.
    onDeleteConfirmed: function() {
      var component = this;
      deleteCustomerType(this.$store, this.token, true)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("customerTypeDeleted");
    }
  }
};
</script>

<style scoped>
</style>
