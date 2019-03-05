<template>
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
        <v-tabs-item key="details" href="#details">Script Details</v-tabs-item>
        <v-tabs-item key="content" href="#content">Script Content</v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content key="details" id="details">
          <v-card flat>
            <v-card-text>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field required label="Id" v-model="scriptId"></v-text-field>
                    <div class="verror">
                      <span v-if="$v.scriptId.$invalid && $v.$dirty">Id is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field required label="Name" v-model="scriptName"></v-text-field>
                    <div class="verror">
                      <span v-if="$v.scriptName.$invalid && $v.$dirty">Name is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      required
                      multi-line
                      label="Description"
                      v-model="scriptDescription"
                    ></v-text-field>
                    <div class="verror">
                      <span
                        v-if="$v.scriptDescription.$invalid && $v.$dirty"
                      >Description is required.</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      required
                      :items="scriptTypes"
                      v-model="scriptType"
                      label="Script Type"
                      light
                      single-line
                      auto
                      hide-details
                    ></v-select>
                    <div class="verror">
                      <span v-if="$v.scriptType.$invalid && $v.$dirty">Script Type is required.</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content key="content" id="content">
          <v-card>
            <v-card-text>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-select
                      :items="scriptTemplates"
                      v-model="scriptTemplate"
                      label="Script Template"
                      light
                      single-line
                      auto
                      item-text="name"
                      item-value="id"
                      hide-details
                      @change="onTemplateUpdated"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      textarea
                      multi-line
                      :rows="15"
                      label="Script Content"
                      v-model="scriptContent"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </base-dialog>
</template>

<script>
import BaseDialog from "../common/BaseDialog";

import { required } from "vuelidate/lib/validators";
import {
  listScriptTemplates,
  getScriptTemplateContent
} from "../../rest/sitewhere-scripting-api";

export default {
  data: () => ({
    active: null,
    dialogVisible: false,
    scriptId: "",
    scriptName: "",
    scriptDescription: "",
    scriptType: {},
    scriptContent: "",
    scriptTemplate: null,
    scriptTemplates: [],
    scriptTypes: [
      {
        text: "Groovy",
        value: "groovy"
      }
    ],
    error: null
  }),

  validations: {
    scriptId: {
      required
    },
    scriptName: {
      required
    },
    scriptDescription: {
      required
    },
    scriptType: {
      required
    }
  },

  components: {
    BaseDialog
  },

  props: ["title", "width", "createLabel", "cancelLabel", "identifier"],

  methods: {
    // Generate payload from UI.
    generatePayload: function() {
      var payload = {};
      payload.id = this.$data.scriptId;
      payload.name = this.$data.scriptName;
      payload.description = this.$data.scriptDescription;
      payload.type = this.$data.scriptType;
      payload.content = btoa(this.$data.scriptContent);
      return payload;
    },

    // Reset dialog contents.
    reset: function(e) {
      this.$data.scriptId = null;
      this.$data.scriptName = null;
      this.$data.scriptDescription = null;
      this.$data.scriptType = null;
      this.$data.scriptContent = "// Add script content here.";
      this.$v.$reset();

      // Refresh list of script templates.
      this.loadTemplates();
    },

    // Refresh list of scripts.
    loadTemplates: function() {
      var component = this;
      listScriptTemplates(this.$store, this.identifier)
        .then(function(response) {
          component.$data.scriptTemplates = response.data;
        })
        .catch(function(e) {});
    },

    // Called when selected template is updated.
    onTemplateUpdated: function(templateId) {
      var component = this;
      getScriptTemplateContent(this.$store, this.identifier, templateId)
        .then(function(response) {
          component.$data.scriptContent = response.data;
        })
        .catch(function(e) {});
    },

    // Load dialog from a given payload.
    load: function(payload) {
      this.reset();

      if (payload) {
        this.$data.scriptId = payload.id;
        this.$data.scriptName = payload.name;
        this.$data.scriptDescription = payload.description;
        this.$data.scriptType = payload.type;
        this.$data.scriptContent = atob(payload.content);
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
      var payload = this.generatePayload();
      this.$emit("payload", payload);
    },

    // Called after cancel button is clicked.
    onCancelClicked: function(e) {
      this.$data.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
