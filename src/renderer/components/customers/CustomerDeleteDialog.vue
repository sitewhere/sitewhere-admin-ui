<template>
  <span>
    <sw-delete-dialog
      title="Delete Customer"
      width="400"
      :error="error"
      @delete="onDeleteConfirmed"
    >
      <v-card-text>Are you sure you want to delete this customer?</v-card-text>
    </sw-delete-dialog>
  </span>
</template>

<script>
import { deleteCustomer } from "../../rest/sitewhere-customers-api";

export default {
  data: () => ({
    error: null
  }),

  props: ["token"],

  methods: {
    // Show delete dialog.
    showDeleteDialog: function() {
      this.$children[0].openDialog();
    },

    // Perform delete.
    onDeleteConfirmed: function() {
      var component = this;
      deleteCustomer(this.$store, this.token, true)
        .then(function(response) {
          component.onDeleted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful delete.
    onDeleted: function(result) {
      this.$children[0].closeDialog();
      this.$emit("customerDeleted");
    }
  }
};
</script>

<style scoped>
</style>
