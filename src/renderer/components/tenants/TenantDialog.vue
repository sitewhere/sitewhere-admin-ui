<template>
  <base-dialog :title="title" :width="width" :visible="dialogVisible"
    :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
    @createClicked="onCreateClicked" @cancelClicked="onCancelClicked">
    <v-tabs v-model="active">
      <v-tabs-bar dark color="primary">
        <v-tabs-item key="details" href="#details">
          Tenant Details
        </v-tabs-item>
        <v-tabs-item key="branding" href="#branding">
          Branding
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
                    <v-text-field required class="mt-1" label="Tenant token"
                      v-model="tenantToken" hide-details prepend-icon="info">
                    </v-text-field>
                    <div class="verror">
                      <span v-if="!$v.tenantToken.required && $v.$dirty">Tenant token is required.</span>
                      <span v-if="!$v.tenantToken.validToken && $v.$dirty">Tenant token is not valid.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field required class="mt-1" label="Name"
                      v-model="tenantName" hide-details prepend-icon="info">
                    </v-text-field>
                    <div class="verror">
                      <span v-if="$v.tenantName.$invalid && $v.$dirty">Name is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field required class="mt-1"
                      label="Authentication Token" v-model="tenantAuthToken"
                      hide-details prepend-icon="https">
                    </v-text-field>
                    <div class="verror">
                      <span v-if="$v.tenantAuthToken.$invalid && $v.$dirty">Authentication Token is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-select label="Authorized users"
                      v-bind:items="allUsers" v-model="tenantAuthUsers" multiple
                      item-text="username" item-value="username"
                      chips prepend-icon="info">
                    </v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-select required :items="templatesList"
                      v-model="tenantTemplateId" label="Template"
                      item-text="name" item-value="id"
                      prepend-icon="info"></v-select>
                    <div class="verror">
                      <span v-if="$v.tenantTemplateId.$invalid && $v.$dirty">Template is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-select required :items="datasetsList"
                      v-model="datasetTemplateId" label="Dataset"
                      item-text="name" item-value="id"
                      prepend-icon="info"></v-select>
                    <div class="verror">
                      <span v-if="$v.datasetTemplateId.$invalid && $v.$dirty">Dataset is required.</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content key="branding" id="branding">
          <branding-panel 
            ref="branding"
            @payload="onBrandingChanged"
            :validateImageUrlRequired=true
            :branding="branding">
          </branding-panel>
        </v-tabs-content>
        <v-tabs-content key="metadata" id="metadata">
          <metadata-panel :metadata="metadata"
            @itemDeleted="onMetadataDeleted" @itemAdded="onMetadataAdded"/>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </base-dialog>
</template>

<script>
import Utils from "../common/Utils";
import BaseDialog from "../common/BaseDialog";
import BrandingPanel from "../common/BrandingPanel";
import MetadataPanel from "../common/MetadataPanel";
import { required, url, helpers } from "vuelidate/lib/validators";
import {
  _getTenantTemplates,
  _getDatasetTemplates,
  _listUsers
} from "../../http/sitewhere-api-wrapper";

const validToken = helpers.regex('validToken', /^[a-zA-Z0-9-_]+$/);

export default {
  data: () => ({
    active: null,
    menu: null,
    dialogVisible: false,
    tenantToken: null,
    tenantName: null,
    tenantLogoUrl: null,
    tenantAuthToken: null,
    tenantAuthUsers: [],
    tenantTemplateId: null,
    datasetTemplateId: null,
    branding: {},
    metadata: [],
    templatesList: [],
    datasetsList: [],
    allUsers: [],
    error: null
  }),

  validations: {
    tenantToken: {
      required,
      validToken
    },
    tenantName: {
      required
    },
    tenantAuthToken: {
      required
    },
    tenantAuthUsers: {
      required
    },
    tenantTemplateId: {
      required
    },
    datasetTemplateId: {
      required
    }
  },

  components: {
    BaseDialog,
    BrandingPanel,
    MetadataPanel
  },

  props: ["title", "width", "createLabel", "cancelLabel"],

  methods: {
    // Generate payload from UI.
    generatePayload: function() {
      let payload = {};
      payload.token = this.$data.tenantToken;
      payload.name = this.$data.tenantName;
      payload.imageUrl = this.$data.branding.imageUrl;
      payload.icon = this.$data.branding.icon;
      payload.backgroundColor = this.$data.branding.backgroundColor;
      payload.foregroundColor = this.$data.branding.foregroundColor;
      payload.borderColor = this.$data.branding.borderColor;
      payload.authenticationToken = this.$data.tenantAuthToken;
      payload.authorizedUserIds = this.$data.tenantAuthUsers;
      payload.tenantTemplateId = this.$data.tenantTemplateId;
      payload.datasetTemplateId = this.$data.datasetTemplateId;
      payload.metadata = Utils.arrayToMetadata(this.$data.metadata);
      return payload;
    },

    // Reset dialog contents.
    reset: function(e) {
      this.$data.tenantToken = null;
      this.$data.tenantName = null;
      this.$data.tenantAuthToken = null;
      this.$data.tenantAuthUsers = [];
      this.$data.tenantTemplateId = null;
      this.$data.datasetTemplateId = null;
      this.$data.metadata = [];
      this.$data.branding = {};
      this.$data.branding.imageUrl = null;
      this.$data.branding.icon = null;
      this.$data.branding.backgroundColor = null;
      this.$data.branding.foregroundColor = null;
      this.$data.branding.borderColor = null;
      this.$data.active = "details";
      this.$v.$reset();
      
      // Reload tenant templates list.
      var component = this;
      _getTenantTemplates(this.$store)
        .then(function(response) {
          component.templatesList = response.data;
        })
        .catch(function(e) {});
      _getDatasetTemplates(this.$store)
        .then(function(response) {
          component.datasetsList = response.data;
        })
        .catch(function(e) {});
      _listUsers(this.$store, false, 1000)
        .then(function(response) {
          component.allUsers = response.data.results;
        })
        .catch(function(e) {});
    },

    // Load dialog from a given payload.
    load: function(payload) {
      this.reset();

      if (payload) {
        this.$data.tenantToken = payload.token;
        this.$data.tenantName = payload.name;
        this.$data.tenantAuthToken = payload.authenticationToken;
        this.$data.tenantAuthUsers = payload.authorizedUserIds;
        this.$data.tenantTemplateId = payload.tenantTemplateId;
        this.$data.datasetTemplateId = payload.datasetTemplateId;
        this.$data.branding = {};
        this.$data.branding.imageUrl = payload.imageUrl;
        this.$data.branding.icon = payload.icon;
        this.$data.branding.backgroundColor = payload.backgroundColor;
        this.$data.branding.foregroundColor = payload.foregroundColor;
        this.$data.branding.borderColor = payload.borderColor;
        this.$data.metadata = Utils.metadataToArray(payload.metadata);
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

    // Called after create button is clicked.
    onCreateClicked: function(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if(!this.$refs['branding'].isValid()) {
        this.$data.active = 'branding'
        return
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
    onBrandingChanged: function (branding) {
      this.$data.branding = branding;
    }
  }
};
</script>

<style scoped>
</style>
