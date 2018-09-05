<template>
  <base-dialog :title="title" :width="width" :visible="dialogVisible"
    :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
    @createClicked="onCreateClicked" @cancelClicked="onCancelClicked">
    <v-tabs v-model="active">
      <v-tabs-bar dark color="primary">
        <v-tabs-item key="details" href="#details">
          Asset Details
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
                    <v-text-field required class="mt-1" label="Device Group token"
                      v-model="groupToken" hide-details prepend-icon="info">
                    </v-text-field>
                    <div class="verror">
                      <span v-if="!$v.groupToken.required && $v.$dirty">Device Group token is required.</span>
                      <span v-if="!$v.groupToken.validToken && $v.$dirty">Device Group token is not valid.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field required class="mt-1" label="Group name"
                      v-model="groupName" prepend-icon="info"></v-text-field>
                    <div class="verror">
                      <span v-if="$v.groupName.$invalid && $v.$dirty">Name is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field class="mt-1" multi-line label="Description"
                      v-model="groupDescription" prepend-icon="subject">
                    </v-text-field>
                    <div class="verror">
                      <span v-if="$v.groupDescription.$invalid && $v.$dirty">Description is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field class="mt-1" label="Image URL"
                      v-model="groupImageUrl" prepend-icon="image">
                    </v-text-field>
                    <div class="verror">
                      <span v-if="!$v.groupImageUrl.required && $v.$dirty">Image URL is required.</span>
                      <span v-if="!$v.groupImageUrl.url && $v.$dirty">URL is not valid.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <roles-field :roles="groupRoles"
                      @onRolesUpdated="onRolesUpdated">
                    </roles-field>
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
</template>

<script>
import Utils from "../common/Utils"
import BaseDialog from "../common/BaseDialog"
import MetadataPanel from "../common/MetadataPanel"
import RolesField from "./RolesField"
import { required, helpers, url } from "vuelidate/lib/validators";

const validToken = helpers.regex('validToken', /^[a-zA-Z0-9-_]+$/)

export default {

  data: () => ({
    active: null,
    menu: null,
    dialogVisible: false,
    groupToken: null,
    groupName: null,
    groupDescription: null,
    groupImageUrl: null,
    groupRoles: [],
    metadata: [],
    error: null
  }),

  validations: {
    groupToken: {
      required,
      validToken
    },
    groupName: {
      required
    },
    groupDescription: {
      required
    },
    groupImageUrl: {
      required,
      url
    }
  },

  components: {
    BaseDialog,
    MetadataPanel,
    RolesField
  },

  props: ["title", "width", "createLabel", "cancelLabel"],

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      var payload = {};
      payload.token = this.$data.groupToken;
      payload.name = this.$data.groupName;
      payload.description = this.$data.groupDescription;
      payload.imageUrl = this.$data.groupImageUrl;
      payload.roles = this.$data.groupRoles;
      payload.metadata = Utils.arrayToMetadata(this.$data.metadata);
      return payload;
    },

    // Reset dialog contents.
    reset: function (e) {
      this.$data.groupToken = null;
      this.$data.groupName = null;
      this.$data.groupDescription = null;
      this.$data.groupImageUrl = null;
      this.$data.groupRoles = [];
      this.$data.metadata = [];
      this.$data.active = "details";
      this.$v.$reset();
    },

    // Load dialog from a given payload.
    load: function (payload) {
      this.reset();

      if (payload) {
        this.$data.groupToken = payload.token;
        this.$data.groupName = payload.name;
        this.$data.groupDescription = payload.description;
        this.$data.groupImageUrl = payload.imageUrl;
        this.$data.groupRoles = payload.roles;
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
    // Called when roles are updated.
    onRolesUpdated: function (roles) {
      this.$data.groupRoles = roles;
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
