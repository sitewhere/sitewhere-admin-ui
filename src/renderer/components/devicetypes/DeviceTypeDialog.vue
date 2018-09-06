<template>
  <base-dialog :title="title" :width="width" :visible="dialogVisible"
    :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
    @createClicked="onCreateClicked" @cancelClicked="onCancelClicked"
    hideButtons="true">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1">Device Type</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2">Metadata<small>Optional</small></v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field required class="mt-1" label="Device Type token"
                    v-model="typeToken" hide-details prepend-icon="info">
                  </v-text-field>
                  <div class="verror">
                    <span v-if="!$v.typeToken.required && $v.$dirty">Device Type token is required.</span>
                    <span v-if="!$v.typeToken.validToken && $v.$dirty">Device Type token is not valid.</span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <v-text-field required class="mt-1" label="Type name"
                    v-model="typeName" prepend-icon="info"></v-text-field>
                  <div class="verror">
                    <span v-if="$v.typeName.$invalid && $v.$dirty">Name is required.</span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <v-text-field class="mt-1" multi-line label="Description"
                    v-model="typeDescription" prepend-icon="subject">
                  </v-text-field>
                  <div class="verror">
                    <span v-if="$v.typeDescription.$invalid && $v.$dirty">Description is required.</span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <v-text-field class="mt-1" label="Image URL"
                    v-model="typeImageUrl" prepend-icon="image">
                  </v-text-field>
                  <div class="verror">
                    <span v-if="!$v.typeImageUrl.required && $v.$dirty">Image URL is required.</span>
                    <span v-if="!$v.typeImageUrl.url && $v.$dirty">URL is not valid.</span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <v-select required :items="containerPolicies" v-model="typeContainerPolicy"
                    label="Container policy" prepend-icon="developer_board"></v-select>
                  <div class="verror">
                    <span v-if="$v.typeContainerPolicy.$invalid && $v.$dirty">Container policy is required.</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="onCancelClicked">{{ cancelLabel }}</v-btn>
          <v-btn color="primary" flat :disabled="!firstPageComplete"
            @click="onCreateClicked">{{ createLabel }}</v-btn>
          <v-btn color="primary" :disabled="!firstPageComplete" flat
            @click="step = 2">Add metadata
            <v-icon light>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-stepper-content>
      <v-stepper-content step="2">
        <metadata-panel class="mb-3" :metadata="metadata"
          @itemDeleted="onMetadataDeleted" @itemAdded="onMetadataAdded"/>
          <v-card-actions>
            <v-btn color="primary" flat @click="step = 1">
              <v-icon light>keyboard_arrow_left</v-icon>
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat @click="onCancelClicked">{{ cancelLabel }}</v-btn>
            <v-btn color="primary" flat :disabled="!firstPageComplete"
              @click="onCreateClicked">{{ createLabel }}</v-btn>
          </v-card-actions>
      </v-stepper-content>
    </v-stepper>
  </base-dialog>
</template>

<script>
import Utils from "../common/Utils";
import BaseDialog from "../common/BaseDialog";
import MetadataPanel from "../common/MetadataPanel";
import AssetTypeChooser from "../assettypes/AssetTypeChooser";
import { required, helpers, url } from "vuelidate/lib/validators";

const validToken = helpers.regex('validToken', /^[a-zA-Z0-9-_]+$/);

export default {

  data: () => ({
    step: null,
    dialogVisible: false,
    typeToken: null,
    typeName: null,
    typeDescription: null,
    typeImageUrl: null,
    typeContainerPolicy: null,
    typeAssetTypeToken: null,
    metadata: [],
    containerPolicies: [
      {
        "text": "Standalone Device",
        "value": "Standalone"
      }, {
        "text": "Composite Device",
        "value": "Composite"
      }
    ],
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
    },
    typeImageUrl: {
      required,
      url
    },
    typeContainerPolicy: {
      required
    }
  },

  components: {
    BaseDialog,
    MetadataPanel,
    AssetTypeChooser
  },

  props: ["title", "width", "createLabel", "cancelLabel"],

  computed: {
    // Indicates if first page fields are filled in.
    firstPageComplete: function () {
      this.$v.$touch();
      return (!this.$v.typeToken.$invalid) && 
        (!this.$v.typeName.$invalid) &&
        (!this.$v.typeDescription.$invalid) &&
        (!this.$v.typeImageUrl.$invalid) &&
        (!this.$v.typeContainerPolicy.$invalid);
    }
  },

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      var payload = {};
      payload.token = this.$data.typeToken;
      payload.name = this.$data.typeName;
      payload.description = this.$data.typeDescription;
      payload.imageUrl = this.$data.typeImageUrl;
      payload.containerPolicy = this.$data.typeContainerPolicy;
      payload.metadata = Utils.arrayToMetadata(this.$data.metadata);
      return payload;
    },
    // Reset dialog contents.
    reset: function () {
      this.$data.typeToken = null;
      this.$data.typeName = null;
      this.$data.typeDescription = null;
      this.$data.typeImageUrl = null;
      this.$data.typeContainerPolicy = null;
      this.$data.metadata = [];
      this.$data.step = 1;
      this.$v.$reset();
    },
    // Load dialog from a given payload.
    load: function (payload) {
      this.reset();

      if (payload) {
        this.$data.typeToken = payload.token;
        this.$data.typeName = payload.name;
        this.$data.typeDescription = payload.description;
        this.$data.typeImageUrl = payload.imageUrl;
        this.$data.typeContainerPolicy = payload.containerPolicy;
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
    // Called after create button is clicked.
    onCreateClicked: function (e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var payload = this.generatePayload();
      this.$emit("payload", payload);
    },
    // Called after cancel button is clicked.
    onCancelClicked: function (e) {
      this.$data.dialogVisible = false;
    },
    // Called when an asset type is chosen or removed.
    onAssetTypeUpdated: function (assetType) {
      if (assetType) {
        this.$data.typeAssetTypeToken = assetType.token;
      } else {
        this.$data.typeAssetTypeToken = null;
      }
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
    },
    // Tests whether a string is blank.
    isBlank: function (str) {
      return (!str || /^\s*$/.test(str));
    }
  }
}
</script>

<style scoped>
</style>
