<template>
  <attributes-dialog ref="dialog" :title="componentName" width="600"
    createLabel="Update" cancelLabel="Cancel" @payload="onCommit"
    :context="context" :groups="groups" :identifier="identifier" 
    :tenantToken="tenantToken">
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
        ? 'Update ' + this.context.model.name : 'Update Component'
    }
  },

  methods: {
    // Get handle to nested dialog component.
    getDialogComponent: function () {
      return this.$refs['dialog']
    },

    // Send event to open dialog.
    onOpenDialog: function () {
      this.getDialogComponent().load()
      this.getDialogComponent().openDialog()
    },

    // Handle payload commit.
    onCommit: function (payload) {
      this.getDialogComponent().closeDialog()
      this.$emit('attributesUpdated', payload)
    }
  }
}
</script>

<style scoped>
</style>
