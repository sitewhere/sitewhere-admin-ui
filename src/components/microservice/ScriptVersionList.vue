<template>
  <v-list dense two-line>
    <template v-for="version in versions">
      <v-list-item v-bind:key="version.versionId" @click="onVersionClicked(version)">
        <v-list-item-content>
          <v-list-item-title class="subheading">
            <v-icon small :color="versionColor(version)">
              {{
              versionIcon(version)
              }}
            </v-icon>
            {{ formatDate(version.createdDate) }}
          </v-list-item-title>
          <v-list-item-subtitle class="mt-2 caption" v-html="version.comment" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-bind:key="'div_' + version.versionId" />
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { IScriptMetadata, IScriptVersion } from "sitewhere-rest-api";
import { formatDate } from "sitewhere-ide-common";
import Vue from "vue";

@Component({})
export default class ScriptVersionList extends Vue {
  @Prop() readonly selectedScript!: IScriptMetadata;
  @Prop() readonly versions!: IScriptVersion[];

  /** Called when a version is clicked */
  onVersionClicked(version: IScriptVersion) {
    this.$emit("selected", version);
  }

  /** Function to determine if a version is active for a script */
  isVersionActive(
    selected: IScriptMetadata | null,
    version: IScriptVersion | null
  ): boolean {
    if (selected && version) {
      if (selected.activeVersion === version.versionId) {
        return true;
      }
    }
    return false;
  }

  /** Get icon indicating whether current version is active */
  versionIcon(version: IScriptVersion): string {
    return this.isVersionActive(this.selectedScript, version)
      ? "check_circle"
      : "power_settings_new";
  }

  /** Get icon indicating whether current version is active */
  versionColor(version: IScriptVersion): string {
    return this.isVersionActive(this.selectedScript, version) ? "#6c6" : "#ccc";
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
