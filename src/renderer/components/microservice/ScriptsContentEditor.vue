<template>
  <v-card v-if="selectedVersion">
    <v-card-text>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="subheading">
          {{ scriptTitle }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn dark color="red darken-3" slot="activator" @click="onActivate">
            <v-icon left>
              fa-bolt
            </v-icon>
            Activate
          </v-btn>
          <span>Make Version Active</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn dark color="blue" slot="activator" @click="onClone">
            <v-icon left>
              fa-clone
            </v-icon>
            Clone
          </v-btn>
          <span>Clone as New Version</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn dark color="green" slot="activator" @click="onSave">
            <v-icon left>
              fa-cloud-upload
            </v-icon>
            Save
          </v-btn>
          <span>Upload Changes</span>
        </v-tooltip>
      </v-toolbar>
      <v-card>
        <div style="height: 500px; overflow-y: auto;">
          <codemirror ref="cm" v-model="content" :options="options">
          </codemirror>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite/dist/vuecodemirror.min.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/groovy/groovy'
import Utils from '../common/Utils'
import {
  _getGlobalScriptContent,
  _getTenantScriptContent,
  _updateGlobalScript,
  _updateTenantScript,
  _cloneGlobalScript,
  _cloneTenantScript,
  _activateGlobalScript,
  _activateTenantScript
} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
    selectedScript: null,
    selectedVersion: null,
    content: '',
    options: {
      mode: 'groovy'
    }
  }),

  props: ['identifier', 'tenantToken', 'script', 'version'],

  components: {
    codemirror
  },

  computed: {
    scriptTitle: function () {
      if (this.$data.selectedScript && this.$data.selectedVersion) {
        return this.$data.selectedScript.id + '.' +
          this.$data.selectedScript.type + ' (' +
          this.formatDate(this.$data.selectedVersion.createdDate) + ')'
      }
      return null
    },
    codemirror: function () {
      return this.$refs.cm.codemirror
    }
  },

  watch: {
    script: function (updated) {
      this.$data.selectedScript = updated
    },
    version: function (updated) {
      this.$data.selectedVersion = updated
    },
    selectedVersion: function (updated) {
      this.updateContent()
    }
  },

  methods: {
    // Format date.
    formatDate: function (date) {
      return Utils.formatDate(date)
    },

    // Update content.
    updateContent: function () {
      var component = this
      if (!this.tenantToken) {
        _getGlobalScriptContent(this.$store, this.identifier,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId)
          .then(function (response) {
            component.$data.content = response.data
          }).catch(function (e) {
            console.log(e)
          })
      } else {
        _getTenantScriptContent(this.$store, this.identifier, this.tenantToken,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId)
          .then(function (response) {
            component.$data.content = response.data
          }).catch(function (e) {
            console.log(e)
          })
      }
    },

    // Save editor content.
    onSave: function () {
      var component = this
      var script = this.$data.selectedScript
      var updated = {
        'id': script.id,
        'name': script.name,
        'description': script.description,
        'type': script.type,
        'content': btoa(this.$data.content)
      }
      if (!this.tenantToken) {
        _updateGlobalScript(this.$store, this.identifier,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId,
          updated)
          .then(function (response) {
            component.$emit('saved')
          }).catch(function (e) {
            console.log(e)
          })
      } else {
        _updateTenantScript(this.$store, this.identifier, this.tenantToken,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId,
          updated)
          .then(function (response) {
            component.$emit('saved')
          }).catch(function (e) {
            console.log(e)
          })
      }
    },

    // Create clone of edited version.
    onClone: function () {
      var component = this
      var request = {
        'comment': 'I am a clone.'
      }
      if (!this.tenantToken) {
        _cloneGlobalScript(this.$store, this.identifier,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId,
          request)
          .then(function (response) {
            component.$emit('cloned', response.data)
          }).catch(function (e) {
            console.log(e)
          })
      } else {
        _cloneTenantScript(this.$store, this.identifier, this.tenantToken,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId,
          request)
          .then(function (response) {
            component.$emit('cloned', response.data)
          }).catch(function (e) {
            console.log(e)
          })
      }
    },

    // Activate current version.
    onActivate: function () {
      var component = this
      if (!this.tenantToken) {
        _activateGlobalScript(this.$store, this.identifier,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId)
          .then(function (response) {
            component.$emit('activated', response.data)
          }).catch(function (e) {
            console.log(e)
          })
      } else {
        _activateTenantScript(this.$store, this.identifier, this.tenantToken,
          this.$data.selectedScript.id, this.$data.selectedVersion.versionId)
          .then(function (response) {
            component.$emit('activated', response.data)
          }).catch(function (e) {
            console.log(e)
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
