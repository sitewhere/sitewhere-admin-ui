<template>
  <base-dialog :title="title" width="900" :visible="dialogVisible"
    :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
    @createClicked="onCreateClicked" @cancelClicked="onCancelClicked">
    <component-attributes :context="context" :groups="groups" :readOnly="false"
      :identifier="identifier" :tenantToken="tenantToken" 
      @initialValues="onInitialValues" @valuesUpdated="onValuesUpdated">
    </component-attributes>
  </base-dialog>
</template>

<script>
import BaseDialog from '../common/BaseDialog'
import ComponentAttributes from './ComponentAttributes'

export default {

  data: () => ({
    attributeValues: null,
    dialogVisible: false,
    error: null
  }),

  components: {
    BaseDialog,
    ComponentAttributes
  },

  props: ['context', 'groups', 'title', 'createLabel', 'cancelLabel',
    'identifier', 'tenantToken'],

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      let payload = {}
      payload.localName = this.context.model.localName
      payload.values = this.$data.attributeValues
      return payload
    },

    // Reset dialog contents.
    reset: function (e) {
      this.$data.attributeValues = null
    },

    // Load dialog from a given payload.
    load: function (payload) {
      this.reset()
    },

    // Called to open the dialog.
    openDialog: function () {
      this.$data.dialogVisible = true
    },

    // Called to open the dialog.
    closeDialog: function () {
      this.$data.dialogVisible = false
    },

    // Called to show an error message.
    showError: function (error) {
      this.$data.error = error
    },

    /** Called with initial attribute values */
    onInitialValues: function (values) {
      this.$data.attributeValues = values
    },

    // Called when attribute values are updated.
    onValuesUpdated: function (values) {
      this.$data.attributeValues = values
    },

    // Called after create button is clicked.
    onCreateClicked: function (e) {
      var payload = this.generatePayload()
      this.$emit('payload', payload)
    },

    // Called after cancel button is clicked.
    onCancelClicked: function (e) {
      this.$data.dialogVisible = false
    }
  }
}
</script>

<style scoped>
</style>
