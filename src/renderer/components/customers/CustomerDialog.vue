<template>
  <div>
    <base-dialog :title="title" :width="width" :visible="dialogVisible"
      :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
      @createClicked="onCreateClicked" @cancelClicked="onCancelClicked">
      <v-tabs v-model="active">
        <v-tabs-bar dark color="primary">
          <v-tabs-item key="details" href="#details">
            Customer Details
          </v-tabs-item>
          <v-tabs-item key="metadata" href="#metadata">
            Metadata
          </v-tabs-item>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content key="details" id="details">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field class="mt-1" label="Customer name"
                        v-model="customerName" prepend-icon="info">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <customer-type-selector v-model="customerTypeId"
                        @customerTypeUpdated="onCustomerTypeUpdated">
                      </customer-type-selector>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field class="mt-1" multi-line label="Description"
                        v-model="customerDescription" prepend-icon="subject">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field class="mt-1" label="Image URL"
                        v-model="customerImageUrl" prepend-icon="image">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content key="metadata" id="metadata">
            <metadata-panel :metadata="metadata"
              @itemDeleted="onMetadataDeleted" @itemAdded="onMetadataAdded"/>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </base-dialog>
  </div>
</template>

<script>
import Utils from '../common/Utils'
import BaseDialog from '../common/BaseDialog'
import CustomerTypeSelector from '../customertypes/CustomerTypeSelector'
import MetadataPanel from '../common/MetadataPanel'

export default {

  data: () => ({
    active: null,
    dialogVisible: false,
    customerTypeId: '',
    customerTypeToken: null,
    customerName: '',
    customerDescription: '',
    customerImageUrl: '',
    metadata: [],
    error: null
  }),

  components: {
    BaseDialog,
    CustomerTypeSelector,
    MetadataPanel
  },

  props: ['title', 'width', 'createLabel', 'cancelLabel', 'parentCustomer'],

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      var payload = {}
      payload.customerTypeToken = this.$data.customerTypeToken
      payload.parentCustomerToken =
        this.parentCustomer ? this.parentCustomer.token : null
      payload.name = this.$data.customerName
      payload.description = this.$data.customerDescription
      payload.imageUrl = this.$data.customerImageUrl
      payload.metadata = Utils.arrayToMetadata(this.$data.metadata)
      return payload
    },

    // Reset dialog contents.
    reset: function (e) {
      this.$data.customerTypeId = null
      this.$data.customerTypeToken = null
      this.$data.customerName = null
      this.$data.customerDescription = null
      this.$data.customerImageUrl = null
      this.$data.metadata = []
      this.$data.active = 'details'
    },

    // Load dialog from a given payload.
    load: function (payload) {
      this.reset()

      if (payload) {
        this.$data.customerTypeId = payload.customerType.id
        this.$data.customerTypeToken = payload.customerType.token
        this.$data.customerName = payload.name
        this.$data.customerDescription = payload.description
        this.$data.customerImageUrl = payload.imageUrl
        this.$data.metadata = Utils.metadataToArray(payload.metadata)
      }
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

    // Called when customer type is updated.
    onCustomerTypeUpdated: function (customerType) {
      this.$data.customerTypeToken = customerType ? customerType.token : null
    },

    // Called after create button is clicked.
    onCreateClicked: function (e) {
      var payload = this.generatePayload()
      this.$emit('payload', payload)
    },

    // Called after cancel button is clicked.
    onCancelClicked: function (e) {
      this.$data.dialogVisible = false
    },

    // Called when a metadata entry has been deleted.
    onMetadataDeleted: function (name) {
      var metadata = this.$data.metadata
      for (var i = 0; i < metadata.length; i++) {
        if (metadata[i].name === name) {
          metadata.splice(i, 1)
        }
      }
    },

    // Called when a metadata entry has been added.
    onMetadataAdded: function (entry) {
      var metadata = this.$data.metadata
      metadata.push(entry)
    }
  }
}
</script>

<style scoped>
</style>
