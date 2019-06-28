<template>
  <v-list dense two-line>
    <template v-for="version in versions">
      <v-list-tile v-bind:key="version.versionId" @click="onVersionClicked(version)">
        <v-list-tile-content>
          <v-list-tile-title class="subheading">
            <v-icon :color="versionColor(version)">{{ versionIcon(version) }}</v-icon>
            {{ formatDate(version.createdDate) }}
          </v-list-tile-title>
          <v-list-tile-sub-title v-html="version.comment"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-bind:key="'div_' + version.versionId"></v-divider>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import { IScriptMetadata, IScriptVersion } from "sitewhere-rest-api";
import { formatDate } from "../common/Utils";
import Vue from "vue";

@Component({})
export default class ScriptVersionList extends Vue {
  @Prop() readonly selectedScript!: IScriptMetadata;
  @Prop() readonly versions!: IScriptVersion[];

  /** Called when a version is clicked */
  onVersionClicked(version: IScriptVersion) {
    this.$emit("selected", version);
  }

  /** Get icon indicating whether current version is active */
  versionIcon(version: IScriptVersion): string {
    return isVersionActive(this.selectedScript, version)
      ? "check_circle"
      : "power_settings_new";
  }

  /** Get icon indicating whether current version is active */
  versionColor(version: IScriptVersion): string {
    return isVersionActive(this.selectedScript, version) ? "#6c6" : "#ccc";
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}

/**
 * Function to determine if a version is active for a script.
 */
export function isVersionActive(
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
</script>
