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
                      <v-text-field required class="mt-1" label="Customer token"
                        v-model="customerToken" hide-details prepend-icon="info">
                      </v-text-field>
                      <div class="verror">
                        <span v-if="!$v.customerToken.required && $v.$dirty">Customer token is required.</span>
                        <span v-if="!$v.customerToken.validToken && $v.$dirty">Customer token is not valid.</span>
                      </div>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field required class="mt-1" label="Customer name"
                        v-model="customerName" prepend-icon="info">
                      </v-text-field>
                      <div class="verror">
                        <span v-if="$v.customerName.$invalid && $v.$dirty">Customer name is required.</span>
                      </div>
                    </v-flex>
                    <v-flex xs12>
                      <customer-type-selector v-model="customerTypeId"
                        @customerTypeUpdated="onCustomerTypeUpdated">
                      </customer-type-selector>
                      <div class="verror">
                        <span v-if="$v.customerTypeId.$invalid && $v.$dirty">Customer type is required.</span>
                      </div>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field required class="mt-1" multi-line label="Description"
                        v-model="customerDescription" prepend-icon="subject">
                      </v-text-field>
                      <div class="verror">
                        <span v-if="$v.customerDescription.$invalid && $v.$dirty">Description is required.</span>
                      </div>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field required class="mt-1" label="Image URL"
                        v-model="customerImageUrl" prepend-icon="image">
                      </v-text-field>
                      <div class="verror">
                        <span v-if="!$v.customerImageUrl.required && $v.$dirty">Image URL is required.</span>
                        <span v-if="!$v.customerImageUrl.url && $v.$dirty">URL is not valid.</span>
                      </div>
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
import { required, url, helpers } from "vuelidate/lib/validators";

const validToken = helpers.regex('validToken', /^[a-zA-Z0-9-_]+$/);

export default {

  data: () => ({
    active: null,
    dialogVisible: false,
    customerToken: null,
    customerTypeId: '',
    customerTypeToken: null,
    customerName: '',
    customerDescription: '',
    customerImageUrl: '',
    metadata: [],
    error: null
  }),

  validations: {
    customerToken: {
      required,
      validToken
    },
    customerName: {
      required
    },
    customerDescription: {
      required
    },
    customerTypeId: {
      required
    },
    customerImageUrl: {
      required,
      url
    }
  },

  components: {
    BaseDialog,
    CustomerTypeSelector,
    MetadataPanel
  },

  props: ['title', 'width', 'createLabel', 'cancelLabel', 'parentCustomer'],

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      var payload = {};
      payload.token = this.$data.customerToken;
      payload.customerTypeToken = this.$data.customerTypeToken;
      payload.parentCustomerToken =
        this.parentCustomer ? this.parentCustomer.token : null;
      payload.name = this.$data.customerName;
      payload.description = this.$data.customerDescription;
      payload.imageUrl = this.$data.customerImageUrl;
      payload.metadata = Utils.arrayToMetadata(this.$data.metadata);
      return payload
    },

    // Reset dialog contents.
    reset: function (e) {
      this.$data.customerToken = null;
      this.$data.customerTypeId = null;
      this.$data.customerTypeToken = null;
      this.$data.customerName = null;
      this.$data.customerDescription = null;
      this.$data.customerImageUrl = null;
      this.$data.metadata = [];
      this.$data.active = 'details';
      this.$v.$reset();
    },

    // Load dialog from a given payload.
    load: function (payload) {
      this.reset();

      if (payload) {
        this.$data.customerToken = payload.token;
        this.$data.customerTypeId = payload.customerType.id;
        this.$data.customerTypeToken = payload.customerType.token;
        this.$data.customerName = payload.name;
        this.$data.customerDescription = payload.description;
        this.$data.customerImageUrl = payload.imageUrl;
        this.$data.metadata = Utils.metadataToArray(payload.metadata);
      }
    },

    // Called to open the dialog.
    openDialog: function () {
      this.$data.dialogVisible = true;
    },

    // Called to open the dialog.
    closeDialog: function () {
      this.$data.dialogVisible = false;
    },

    // Called to show an error message.
    showError: function (error) {
      this.$data.error = error;
    },

    // Called when customer type is updated.
    onCustomerTypeUpdated: function (customerType) {
      this.$data.customerTypeToken = customerType ? customerType.token : null;
    },

    // Called after create button is clicked.
    onCreateClicked: function (e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var payload = this.generatePayload();
      this.$emit('payload', payload);
    },

    // Called after cancel button is clicked.
    onCancelClicked: function (e) {
      this.$data.dialogVisible = false;
    },

    // Called when a metadata entry has been deleted.
    onMetadataDeleted: function (name) {
      var metadata = this.$data.metadata;
      for (var i = 0; i < metadata.length; i++) {
        if (metadata[i].name === name) {
          metadata.splice(i, 1);
        }
      }
    },

    // Called when a metadata entry has been added.
    onMetadataAdded: function (entry) {
      var metadata = this.$data.metadata;
      metadata.push(entry);
    }
  }
}
</script>

<style scoped>
</style>
