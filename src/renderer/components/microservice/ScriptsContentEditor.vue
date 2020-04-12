<template>
  <v-layout row wrap fill-height v-if="selectedVersion">
    <v-flex xs12>
      <v-card flat height="100%">
        <editor
          ref="editor"
          v-model="content"
          @init="editorInit"
          lang="groovy"
          theme="chrome"
          :options="aceOptions"
          width="100%"
          height="100%"
        ></editor>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";

import { AxiosResponse } from "axios";
import { getTenantScriptContent } from "../../rest/sitewhere-scripting-api";
import { formatDate } from "sitewhere-ide-common";
import { IScriptMetadata, IScriptVersion } from "sitewhere-rest-api";

@Component({
  components: {
    editor: require("vue2-ace-editor")
  }
})
export default class ScriptsContentEditor extends Vue {
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;
  @Prop() readonly script!: IScriptMetadata;
  @Prop() readonly version!: IScriptVersion;

  /** References */
  $refs!: Refs<{
    editor: any;
  }>;

  selectedScript: any = null;
  selectedVersion: any = null;
  content: string = "";
  aceOptions: {} = {
    showPrintMargin: false
  };

  @Watch("script", { immediate: true })
  onScriptUpdated(updated: IScriptMetadata) {
    this.selectedScript = updated;
  }

  @Watch("version", { immediate: true })
  onVersionUpdated(updated: IScriptVersion) {
    this.selectedVersion = updated;
  }

  @Watch("selectedVersion", { immediate: true })
  onSelectedVersionUpdated(updated: IScriptVersion) {
    this.updateContent();
  }

  @Watch("content", { immediate: true })
  onContentUpdated(updated: string) {
    this.$emit("content", updated);
  }

  /** Get handle to embedded Ace editor */
  get editor(): any {
    return this.$refs.editor.editor;
  }

  /** Initialize code editor by requiring dependencies */
  editorInit() {
    require("brace/ext/language_tools"); //language extension prerequsite...
    require("brace/mode/groovy");
    require("brace/mode/javascript"); //language
    require("brace/mode/less");
    require("brace/theme/chrome");
    require("brace/snippets/javascript"); //snippet

    this.editor.commands.addCommand({
      name: "save",
      bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
      exec: this.onSaveContent
    });
  }

  /** Update script content */
  async updateContent() {
    let response: AxiosResponse<string> = await getTenantScriptContent(
      this.$store,
      this.identifier,
      this.tenantToken,
      this.selectedScript.id,
      this.selectedVersion.versionId
    );
    this.content = response.data;
    console.log(this.editor);
  }

  /** Called when save keybinding is clicked */
  onSaveContent() {
    this.$emit("save");
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
