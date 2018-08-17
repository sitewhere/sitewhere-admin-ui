<template>
  <div>
    <customer-type-dialog ref="dialog" title="Edit Customer Type" width="600"
      resetOnOpen="true" createLabel="Update" cancelLabel="Cancel"
      @payload="onCommit" :customerTypes="customerTypes">
    </customer-type-dialog>
  </div>
</template>

<script>
import FloatingActionButton from '../common/FloatingActionButton'
import CustomerTypeDialog from './CustomerTypeDialog'
import {
  _getCustomerType,
  _updateCustomerType
} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
  }),

  components: {
    FloatingActionButton,
    CustomerTypeDialog
  },

  props: ['token', 'customerTypes'],

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function () {
      return this.$refs['dialog']
    },

    // Send event to open dialog.
    onOpenDialog: function () {
      var component = this
      _getCustomerType(this.$store, this.token)
        .then(function (response) {
          component.onDataLoaded(response)
        }).catch(function (e) {
        })
    },

    // Called after data is loaded.
    onDataLoaded: function (response) {
      this.getDialogComponent().load(response.data)
      this.getDialogComponent().openDialog()
    },

    // Handle payload commit.
    onCommit: function (payload) {
      var component = this
      _updateCustomerType(this.$store, this.token, payload)
        .then(function (response) {
          component.onCommitted(response)
        }).catch(function (e) {
        })
    },

    // Handle successful commit.
    onCommitted: function (result) {
      this.getDialogComponent().closeDialog()
      this.$emit('customerTypeUpdated')
    }
  }
}
</script>

<style scoped>
</style>
