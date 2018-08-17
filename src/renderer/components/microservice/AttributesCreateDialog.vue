<template>
  <attributes-dialog ref="dialog" :title="componentName"
    width="600" createLabel="Create" cancelLabel="Cancel"
    @payload="onCommit" :context="context" :groups="groups"
    :identifier="identifier" :tenantToken="tenantToken">
  </attributes-dialog>
</template>

<script>
import AttributesDialog from './AttributesDialog'

export default {

  data: () => ({
  }),

  components: {
    AttributesDialog
  },

  props: ['context', 'groups', 'identifier', 'tenantToken'],

  computed: {
    componentName: function () {
      return (this.context)
        ? 'Create New ' + this.context.model.name : 'Create New Component'
    }
  },

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function () {
      return this.$refs['dialog']
    },

    // Response to open dialog request.
    onOpenDialog: function () {
      this.getDialogComponent().reset()
      this.getDialogComponent().openDialog()
    },

    // Handle payload commit.
    onCommit: function (payload) {
      this.getDialogComponent().closeDialog()
      this.$emit('componentAdded', payload)
    }
  }
}
</script>

<style scoped>
</style>
