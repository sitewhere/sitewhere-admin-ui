<template>
  <v-card v-if="selectedVersion" height="100%">
    <v-card-text height="100%">
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="subheading">{{ scriptTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn dark color="red darken-3" slot="activator" @click="onActivate">
            <font-awesome-icon class="mr-2" icon="bolt" size="lg"/>Activate
          </v-btn>
          <span>Make Version Active</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn dark color="blue" slot="activator" @click="onClone">
            <font-awesome-icon class="mr-2" icon="copy" size="lg"/>Clone
          </v-btn>
          <span>Clone as New Version</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn dark color="green" slot="activator" @click="onSave">
            <font-awesome-icon class="mr-2" icon="upload" size="lg"/>Save
          </v-btn>
          <span>Upload Changes</span>
        </v-tooltip>
      </v-toolbar>
      <v-card height="100%">
        <editor
          v-model="content"
          @init="editorInit"
          lang="groovy"
          theme="chrome"
          :options="aceOptions"
          width="100%"
          height="500"
        ></editor>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatDate } from "../common/Utils";
import {
  getGlobalScriptContent,
  getTenantScriptContent,
  updateGlobalScript,
  updateTenantScript,
  cloneGlobalScript,
  cloneTenantScript,
  activateGlobalScript,
  activateTenantScript
} from "../../rest/sitewhere-scripting-api";

export default {
  data: () => ({
    selectedScript: null,
    selectedVersion: null,
    content: "",
    aceOptions: {
      showPrintMargin: false
    }
  }),

  props: ["identifier", "tenantToken", "script", "version"],

  components: {
    editor: require("vue2-ace-editor")
  },

  computed: {
    scriptTitle: function() {
      if (this.$data.selectedScript && this.$data.selectedVersion) {
        return (
          this.$data.selectedScript.id +
          "." +
          this.$data.selectedScript.type +
          " (" +
          this.formatDate(this.$data.selectedVersion.createdDate) +
          ")"
        );
      }
      return null;
    }
  },

  watch: {
    script: function(updated) {
      this.$data.selectedScript = updated;
    },
    version: function(updated) {
      this.$data.selectedVersion = updated;
    },
    selectedVersion: function(updated) {
      this.updateContent();
    }
  },

  methods: {
    // Initialize code editor by requiring dependencies.
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/groovy");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },

    // Update content.
    updateContent: function() {
      var component = this;
      if (!this.tenantToken) {
        getGlobalScriptContent(
          this.$store,
          this.identifier,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId
        )
          .then(function(response) {
            component.$data.content = response.data;
          })
          .catch(function(e) {
            console.log(e);
          });
      } else {
        getTenantScriptContent(
          this.$store,
          this.identifier,
          this.tenantToken,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId
        )
          .then(function(response) {
            component.$data.content = response.data;
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },

    // Save editor content.
    onSave: function() {
      var component = this;
      var script = this.$data.selectedScript;
      var updated = {
        id: script.id,
        name: script.name,
        description: script.description,
        type: script.type,
        content: btoa(this.$data.content)
      };
      if (!this.tenantToken) {
        updateGlobalScript(
          this.$store,
          this.identifier,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId,
          updated
        )
          .then(function(response) {
            component.$emit("saved");
          })
          .catch(function(e) {
            console.log(e);
          });
      } else {
        updateTenantScript(
          this.$store,
          this.identifier,
          this.tenantToken,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId,
          updated
        )
          .then(function(response) {
            component.$emit("saved");
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },

    // Create clone of edited version.
    onClone: function() {
      var component = this;
      var request = {
        comment: "I am a clone."
      };
      if (!this.tenantToken) {
        cloneGlobalScript(
          this.$store,
          this.identifier,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId,
          request
        )
          .then(function(response) {
            component.$emit("cloned", response.data);
          })
          .catch(function(e) {
            console.log(e);
          });
      } else {
        cloneTenantScript(
          this.$store,
          this.identifier,
          this.tenantToken,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId,
          request
        )
          .then(function(response) {
            component.$emit("cloned", response.data);
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },

    // Activate current version.
    onActivate: function() {
      var component = this;
      if (!this.tenantToken) {
        activateGlobalScript(
          this.$store,
          this.identifier,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId
        )
          .then(function(response) {
            component.$emit("activated", response.data);
          })
          .catch(function(e) {
            console.log(e);
          });
      } else {
        activateTenantScript(
          this.$store,
          this.identifier,
          this.tenantToken,
          this.$data.selectedScript.id,
          this.$data.selectedVersion.versionId
        )
          .then(function(response) {
            component.$emit("activated", response.data);
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
