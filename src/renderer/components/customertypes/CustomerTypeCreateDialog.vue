<template>
  <div>
    <customer-type-dialog ref="dialog" title="Create Customer Type" width="600"
      resetOnOpen="true" createLabel="Create" cancelLabel="Cancel"
      @payload="onCommit" :customerTypes="customerTypes">
    </customer-type-dialog>
    <floating-action-button label="Add Customer Type" icon="plus"
      @action="onOpenDialog">
    </floating-action-button>
  </div>
</template>

<script>
import FloatingActionButton from "../common/FloatingActionButton";
import CustomerTypeDialog from "./CustomerTypeDialog";
import { _createCustomerType } from "../../http/sitewhere-api-wrapper";

export default {
  data: () => ({}),

  components: {
    CustomerTypeDialog,
    FloatingActionButton
  },

  props: ["customerTypes"],

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
      _createCustomerType(this.$store, payload)
        .then(function(response) {
          component.onCommitted(response);
        })
        .catch(function(e) {});
    },

    // Handle successful commit.
    onCommitted: function(result) {
      this.getDialogComponent().closeDialog();
      this.$emit("customerTypeAdded");
    }
  }
};
</script>

<style scoped>
</style>
