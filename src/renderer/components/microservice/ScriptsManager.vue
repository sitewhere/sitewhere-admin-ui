<template>
  <sw-content-tab :tabkey="tabkey" :loaded="loaded" loadingMessage="Loading...">
    <template slot="header">
      <v-layout row>
        <v-flex xs3>
          <condensed-toolbar title="Scripts">
            <v-tooltip left>
              <v-icon @click="onScriptCreate" small class="mr-2" slot="activator">add</v-icon>
              <span>Create Script</span>
            </v-tooltip>
            <v-tooltip left>
              <v-icon @click="refresh" small slot="activator">refresh</v-icon>
              <span>Refresh Scripts</span>
            </v-tooltip>
          </condensed-toolbar>
        </v-flex>
        <v-flex xs9>
          <condensed-toolbar :title="scriptTitle" v-if="this.selectedScript != null">
            <template slot="icon">
              <v-icon small>description</v-icon>
            </template>
            <v-menu v-if="selectedScript" offset-y class="mr-3" max-width="400">
              <v-btn color="primary" dark slot="activator">
                <v-icon small class="mr-1" :color="versionColor">{{ versionIcon }}</v-icon>
                <span class="white--text">{{ formatDate(selectedVersion.createdDate) }}</span>
                <v-icon small>expand_more</v-icon>
              </v-btn>
              <script-version-list
                :versions="versions"
                :selectedScript="selectedScript"
                @selected="onVersionSelected"
              />
            </v-menu>
            <v-tooltip left>
              <v-icon @click="onActivate" small class="mr-2" slot="activator">play_circle_outline</v-icon>
              <span>Make Version Active</span>
            </v-tooltip>
            <v-tooltip left>
              <v-icon @click="onClone" small class="mr-2" slot="activator">note_add</v-icon>
              <span>Clone as New Version</span>
            </v-tooltip>
            <v-tooltip left>
              <v-icon @click="onSave" small slot="activator">cloud_upload</v-icon>
              <span>Upload Changes</span>
            </v-tooltip>
          </condensed-toolbar>
          <v-card flat v-else height="100%">
            <v-divider />
          </v-card>
        </v-flex>
      </v-layout>
    </template>
    <v-layout row wrap fill-height>
      <v-flex xs3>
        <v-list dense two-line v-if="scripts && scripts.length > 0" style="height: 100%;">
          <template v-for="script in scripts">
            <v-list-tile v-bind:key="script.id" @click="onScriptClicked(script)">
              <v-list-tile-content>
                <v-list-tile-title class="subheading" v-html="script.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="script.description"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-bind:key="'div_' + script.name"></v-divider>
          </template>
        </v-list>
        <v-card flat v-else class="subheading">
          <v-card-text>No scripts have been configured.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <scripts-content-editor
          v-if="this.selectedScript != null"
          ref="content"
          :script="selectedScript"
          :version="selectedVersion"
          :identifier="identifier"
          :tenantToken="tenantToken"
          @content="onContentUpdated"
        />
        <v-card flat v-else height="100%">
          <v-divider vertical />
        </v-card>
      </v-flex>
    </v-layout>
    <scripts-create-dialog
      ref="create"
      :identifier="identifier"
      :tenantToken="tenantToken"
      @scriptAdded="onScriptAdded"
    />
    <script-create-clone-dialog
      ref="clone"
      :identifier="identifier"
      :tenantToken="tenantToken"
      @save="onSaveClone"
    />
  </sw-content-tab>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import CondensedToolbar from "../common/CondensedToolbar.vue";
import ScriptVersionList, { isVersionActive } from "./ScriptVersionList.vue";
import ScriptsContentEditor from "./ScriptsContentEditor.vue";
import ScriptsCreateDialog from "./ScriptsCreateDialog.vue";
import ScriptCreateCloneDialog from "./ScriptCreateCloneDialog.vue";

import { AxiosResponse } from "axios";
import { formatDate, showMessage } from "../common/Utils";
import {
  listGlobalScriptMetadata,
  listTenantScriptMetadata,
  updateGlobalScript,
  updateTenantScript,
  cloneGlobalScript,
  cloneTenantScript,
  activateGlobalScript,
  activateTenantScript
} from "../../rest/sitewhere-scripting-api";
import { IScriptMetadata, IScriptVersion } from "sitewhere-rest-api";

@Component({
  components: {
    CondensedToolbar,
    ScriptVersionList,
    ScriptsContentEditor,
    ScriptsCreateDialog,
    ScriptCreateCloneDialog
  }
})
export default class ScriptsManager extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  scripts: IScriptMetadata[] = [];
  selectedScript: IScriptMetadata | null = null;
  scriptAfterRefresh: string | null = null;
  versions: IScriptVersion[] = [];
  selectedVersion: IScriptVersion | null = null;
  versionAfterRefresh: string | null = null;
  content: string = "";
  loaded: boolean = false;

  created() {
    this.loaded = false;
    this.refresh();
    this.loaded = true;
  }

  // References.
  $refs!: Refs<{
    create: ScriptsCreateDialog;
    content: ScriptsContentEditor;
    clone: ScriptCreateCloneDialog;
  }>;

  /** Refresh list of scripts */
  async refresh() {
    if (!this.tenantToken) {
      let response: AxiosResponse<
        IScriptMetadata[]
      > = await listGlobalScriptMetadata(this.$store, this.identifier);
      this.onScriptsRefreshed(response.data);
    } else {
      let response: AxiosResponse<
        IScriptMetadata[]
      > = await listTenantScriptMetadata(
        this.$store,
        this.identifier,
        this.tenantToken
      );
      this.onScriptsRefreshed(response.data);
    }
  }

  /** Load selected script after refresh */
  onScriptsRefreshed(scripts: IScriptMetadata[]) {
    this.scripts = scripts;
    if (this.scriptAfterRefresh) {
      this.scripts.forEach(script => {
        if (this.scriptAfterRefresh === script.id) {
          this.onScriptClicked(script);
        }
      });
      this.scriptAfterRefresh = null;
    }
  }

  /** Called when script create button is pressed */
  onScriptCreate() {
    this.$refs.create.open();
  }

  /** Indicates that a new script was added */
  onScriptAdded(scriptId: string) {
    this.scriptAfterRefresh = scriptId;
    this.refresh();
  }

  /** Called when a script is clicked */
  onScriptClicked(script: IScriptMetadata) {
    this.selectedScript = script;
    this.versions = script.versions;
    let versionId = this.versionAfterRefresh;
    if (versionId) {
      for (var i = 0; i < script.versions.length; i++) {
        if (versionId === script.versions[i].versionId) {
          this.selectedVersion = script.versions[i];
          this.versionAfterRefresh = null;
        }
      }
    } else {
      if (script.versions.length > 0) {
        this.selectedVersion = script.versions[0];
      }
    }
  }

  /** Called when a version is clicked */
  onVersionSelected(version: IScriptVersion) {
    this.selectedVersion = version;
  }

  /** Called when content is updated */
  onContentUpdated(content: string) {
    this.content = content;
  }

  /** Save editor content */
  async onSave() {
    if (this.selectedScript && this.selectedVersion) {
      var updated = {
        id: this.selectedScript.id,
        name: this.selectedScript.name,
        description: this.selectedScript.description,
        type: this.selectedScript.type,
        content: btoa(this.content)
      };
      if (!this.tenantToken) {
        await updateGlobalScript(
          this.$store,
          this.identifier,
          this.selectedScript.id,
          this.selectedVersion.versionId,
          updated
        );
        this.onContentSaved();
      } else {
        await updateTenantScript(
          this.$store,
          this.identifier,
          this.tenantToken,
          this.selectedScript.id,
          this.selectedVersion.versionId,
          updated
        );
        this.onContentSaved();
      }
    }
  }

  /** Called when content is saved successfully */
  onContentSaved() {
    showMessage(this, "Script Content Saved Successfully.");
  }

  /** Show dialog for creating clone */
  onClone() {
    this.$refs.clone.open();
  }

  /** Create clone of edited version */
  async onSaveClone(version: IScriptVersion) {
    var request = {
      comment: version.comment
    };
    if (this.selectedScript && this.selectedVersion) {
      if (!this.tenantToken) {
        let response: AxiosResponse<IScriptVersion> = await cloneGlobalScript(
          this.$store,
          this.identifier,
          this.selectedScript.id,
          this.selectedVersion.versionId,
          request
        );
        this.onVersionCloned(response.data);
      } else {
        let response: AxiosResponse<IScriptVersion> = await cloneTenantScript(
          this.$store,
          this.identifier,
          this.tenantToken,
          this.selectedScript.id,
          this.selectedVersion.versionId,
          request
        );
        this.onVersionCloned(response.data);
      }
    }
  }

  /** Called after a script version has been cloned */
  onVersionCloned(version: IScriptVersion) {
    if (this.selectedScript) {
      this.scriptAfterRefresh = this.selectedScript.id;
      this.versionAfterRefresh = version.versionId;
      this.refresh();
      showMessage(this, "Version Cloned Successfully.");
    }
  }

  /** Activate current version */
  async onActivate() {
    if (this.selectedScript && this.selectedVersion) {
      if (!this.tenantToken) {
        await activateGlobalScript(
          this.$store,
          this.identifier,
          this.selectedScript.id,
          this.selectedVersion.versionId
        );
        this.onVersionActivated();
      } else {
        await activateTenantScript(
          this.$store,
          this.identifier,
          this.tenantToken,
          this.selectedScript.id,
          this.selectedVersion.versionId
        );
        this.onVersionActivated();
      }
    }
  }

  /** Called after version has been activated */
  onVersionActivated() {
    if (this.selectedScript && this.selectedVersion) {
      this.scriptAfterRefresh = this.selectedScript.id;
      this.versionAfterRefresh = this.selectedVersion.versionId;
      this.refresh();
      showMessage(this, "Version Activated Successfully.");
    }
  }

  /** Build script title */
  get scriptTitle() {
    if (this.selectedScript && this.selectedVersion) {
      return this.selectedScript.id + "." + this.selectedScript.type;
    }
    return null;
  }

  /** Get icon indicating whether current version is active */
  get versionIcon(): string {
    return isVersionActive(this.selectedScript, this.selectedVersion)
      ? "check_circle"
      : "power_settings_new";
  }

  /** Get icon indicating whether current version is active */
  get versionColor(): string {
    return isVersionActive(this.selectedScript, this.selectedVersion)
      ? "#6c6"
      : "#ccc";
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
