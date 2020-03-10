<template>
  <sw-content-tab :tabkey="tabkey" :loaded="true" loadingMessage="Loading...">
    <editor
      class="editor"
      v-model="json"
      @init="editorInit"
      lang="json"
      theme="chrome"
      :options="aceOptions"
      width="100%"
      height="100%"
    ></editor>
  </sw-content-tab>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import Vue from "vue";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: {
    editor: require("vue2-ace-editor")
  }
})
export default class InstanceConfigurationSource extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: IInstanceConfiguration;

  jsonChoice: number = 0;
  content: string = "";
  aceOptions: {} = {
    showPrintMargin: false,
    readOnly: true
  };

  /** Initialize code editor by requiring dependencies */
  editorInit() {
    require("brace/ext/language_tools"); //language extension prerequsite...
    require("brace/mode/json");
    require("brace/mode/javascript"); //language
    require("brace/mode/less");
    require("brace/theme/chrome");
    require("brace/snippets/javascript"); //snippet
  }

  /** Get JSON for instance configuration */
  get json(): string | null {
    return this.configuration
      ? JSON.stringify(this.configuration, null, 2)
      : null;
  }

  set json(updated: string | null) {}
}
</script>

<style scoped>
.editor {
  border-bottom: 1px solid #eee;
}
</style>
