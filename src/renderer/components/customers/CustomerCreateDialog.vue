<template>
  <div>
    <customer-dialog ref="dialog" title="Create Customer" width="600"
      resetOnOpen="true" createLabel="Create" cancelLabel="Cancel"
      @payload="onCommit" :parentCustomer="parentCustomer">
    </customer-dialog>
    <floating-action-button label="Add Customer" icon="fa-plus"
      @action="onOpenDialog">
    </floating-action-button>
  </div>
</template>

<script>
import FloatingActionButton from '../common/FloatingActionButton'
import CustomerDialog from './CustomerDialog'
import {_createCustomer} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
  }),

  components: {
    CustomerDialog,
    FloatingActionButton
  },

  props: ['parentCustomer'],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function () {
      return this.$refs['dialog']
    },

    // Send event to open dialog.
    onOpenDialog: function () {
      this.getDialogComponent().reset()
      this.getDialogComponent().openDialog()
    },

    // Handle payload commit.
    onCommit: function (payload) {
      var component = this
      _createCustomer(this.$store, payload)
        .then(function (response) {
          component.onCommitted(response)
        }).catch(function (e) {
        })
    },

    // Handle successful commit.
    onCommitted: function (result) {
      this.getDialogComponent().closeDialog()
      this.$emit('customerAdded')
    }
  }
}
</script>

<style scoped>
</style>
