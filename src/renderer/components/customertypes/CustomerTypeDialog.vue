<template>
  <div>
    <base-dialog
      :title="title"
      :width="width"
      :visible="dialogVisible"
      :createLabel="createLabel"
      :cancelLabel="cancelLabel"
      :error="error"
      @createClicked="onCreateClicked"
      @cancelClicked="onCancelClicked"
    >
      <v-tabs v-model="active">
        <v-tabs-bar dark color="primary">
          <v-tabs-item key="details" href="#details">Details</v-tabs-item>
          <v-tabs-item key="cctypes" href="#cctypes">Content</v-tabs-item>
          <v-tabs-item key="branding" href="#branding">Branding</v-tabs-item>
          <v-tabs-item key="metadata" href="#metadata">Metadata</v-tabs-item>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content key="details" id="details">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        required
                        class="mt-1"
                        label="Token"
                        v-model="typeToken"
                        hide-details
                        prepend-icon="info"
                      ></v-text-field>
                      <div class="verror">
                        <span
                          v-if="$v.typeToken.$invalid && $v.$dirty"
                        >Customer type token is required or invalid.</span>
                      </div>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        required
                        class="mt-1"
                        label="Name"
                        v-model="typeName"
                        prepend-icon="info"
                      ></v-text-field>
                      <div class="verror">
                        <span v-if="$v.typeName.$invalid && $v.$dirty">Name is required.</span>
                      </div>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        required
                        class="mt-1"
                        multi-line
                        label="Description"
                        v-model="typeDescription"
                        prepend-icon="subject"
                      ></v-text-field>
                      <div class="verror">
                        <span
                          v-if="$v.typeDescription.$invalid && $v.$dirty"
                        >Description is required.</span>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content key="cctypes" id="cctypes">
            <customer-types-multiselect
              :customerTypes="customerTypes"
              :selectedCustomerTypeIds="typeContainedCustomerTypeIds"
              @selectedCustomerTypesUpdated="onContainedCustomerTypesUpdated"
            ></customer-types-multiselect>
          </v-tabs-content>
          <v-tabs-content key="branding" id="branding">
            <branding-panel ref="branding" @payload="onBrandingChanged" :branding="branding"></branding-panel>
          </v-tabs-content>
          <v-tabs-content key="metadata" id="metadata">
            <metadata-panel
              :metadata="metadata"
              @itemDeleted="onMetadataDeleted"
              @itemAdded="onMetadataAdded"
            />
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </base-dialog>
  </div>
</template>

<script>
import BaseDialog from "../common/BaseDialog";
import IconSelector from "../common/IconSelector";
import CustomerTypesMultiselect from "./CustomerTypesMultiselect";
import BrandingPanel from "../common/BrandingPanel";
import MetadataPanel from "../common/MetadataPanel";

import { arrayToMetadata, metadataToArray } from "../common/Utils";
import { required, helpers } from "vuelidate/lib/validators";

const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

export default {
  data: () => ({
    active: null,
    dialogVisible: false,
    typeToken: null,
    typeName: "",
    typeDescription: "",
    typeContainedCustomerTypeIds: [],
    typeContainedCustomerTypeTokens: [],
    branding: {},
    metadata: [],
    error: null
  }),

  validations: {
    typeToken: {
      required,
      validToken
    },
    typeName: {
      required
    },
    typeDescription: {
      required
    }
  },

  components: {
    BaseDialog,
    IconSelector,
    CustomerTypesMultiselect,
    MetadataPanel,
    BrandingPanel
  },

  props: ["title", "width", "createLabel", "cancelLabel", "customerTypes"],

  methods: {
    // Generate payload from UI.
    generatePayload: function() {
      var payload = {};
      payload.token = this.$data.typeToken;
      payload.name = this.$data.typeName;
      payload.description = this.$data.typeDescription;
      payload.containedCustomerTypeTokens = this.$data.typeContainedCustomerTypeTokens;
      payload.imageUrl = this.$data.branding.imageUrl;
      payload.icon = this.$data.branding.icon;
      payload.backgroundColor = this.$data.branding.backgroundColor;
      payload.foregroundColor = this.$data.branding.foregroundColor;
      payload.borderColor = this.$data.branding.borderColor;
      payload.metadata = arrayToMetadata(this.$data.metadata);
      return payload;
    },

    // Reset dialog contents.
    reset: function(e) {
      this.$data.typeToken = null;
      this.$data.typeName = null;
      this.$data.typeDescription = null;
      this.$data.typeContainedCustomerTypeIds = [];
      this.$data.typeContainedCustomerTypeTokens = [];
      this.$data.metadata = [];
      this.$data.branding = {};
      this.$data.branding.imageUrl = null;
      this.$data.branding.icon = null;
      this.$data.branding.backgroundColor = null;
      this.$data.branding.foregroundColor = null;
      this.$data.branding.borderColor = null;
      this.$data.active = "details";
      this.$v.$reset();
    },

    // Load dialog from a given payload.
    load: function(payload) {
      this.reset();
      if (payload) {
        this.$data.typeToken = payload.token;
        this.$data.typeName = payload.name;
        this.$data.typeDescription = payload.description;
        this.$data.typeContainedCustomerTypeIds =
          payload.containedCustomerTypeIds;
        this.$data.branding = {};
        this.$data.branding.imageUrl = payload.imageUrl;
        this.$data.branding.icon = payload.icon;
        this.$data.branding.backgroundColor = payload.backgroundColor;
        this.$data.branding.foregroundColor = payload.foregroundColor;
        this.$data.branding.borderColor = payload.borderColor;
        this.$data.metadata = metadataToArray(payload.metadata);
      }
    },

    // Called to open the dialog.
    openDialog: function() {
      this.$data.dialogVisible = true;
    },

    // Called to open the dialog.
    closeDialog: function() {
      this.$data.dialogVisible = false;
    },

    // Called to show an error message.
    showError: function(error) {
      this.$data.error = error;
    },

    // Called when list of contained customer types is updated.
    onContainedCustomerTypesUpdated: function(selected) {
      let tokens = [];
      for (let i = 0; i < selected.length; i++) {
        let at = selected[i];
        tokens.push(at.token);
      }
      this.$data.typeContainedCustomerTypeTokens = tokens;
    },

    // Called after create button is clicked.
    onCreateClicked: function(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var payload = this.generatePayload();
      this.$emit("payload", payload);
    },

    // Called after cancel button is clicked.
    onCancelClicked: function(e) {
      this.$data.dialogVisible = false;
    },

    // Called when a metadata entry has been deleted.
    onMetadataDeleted: function(name) {
      var metadata = this.$data.metadata;
      for (var i = 0; i < metadata.length; i++) {
        if (metadata[i].name === name) {
          metadata.splice(i, 1);
        }
      }
    },

    // Called when a metadata entry has been added.
    onMetadataAdded: function(entry) {
      var metadata = this.$data.metadata;
      metadata.push(entry);
    },

    // Called when branding changes
    onBrandingChanged: function(branding) {
      this.$data.branding = branding;
    }
  }
};
</script>

<style scoped>
</style>
