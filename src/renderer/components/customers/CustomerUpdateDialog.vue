<template>
  <div>
    <customer-dialog title="Edit Customer" width="600" resetOnOpen="true"
      createLabel="Update" cancelLabel="Cancel" @payload="onCommit"
      :parentCustomer="parentCustomer">
    </customer-dialog>
  </div>
</template>

<script>
import FloatingActionButton from '../common/FloatingActionButton'
import CustomerDialog from './CustomerDialog'
import {
  _getCustomer,
  _updateCustomer
} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
  }),

  components: {
    FloatingActionButton,
    CustomerDialog
  },

  props: ['token', 'parentCustomer'],

  methods: {
    // Send event to open dialog.
    onOpenDialog: function () {
      var component = this
      _getCustomer(this.$store, this.token)
        .then(function (response) {
          component.onDataLoaded(response)
        }).catch(function (e) {
        })
    },

    // Called after data is loaded.
    onDataLoaded: function (response) {
      this.$children[0].load(response.data)
      this.$children[0].openDialog()
    },

    // Handle payload commit.
    onCommit: function (payload) {
      var component = this
      _updateCustomer(this.$store, this.token, payload)
        .then(function (response) {
          component.onCommitted(response)
        }).catch(function (e) {
        })
    },

    // Handle successful commit.
    onCommitted: function (result) {
      this.$children[0].closeDialog()
      this.$emit('customerUpdated')
    }
  }
}
</script>

<style scoped>
</style>
