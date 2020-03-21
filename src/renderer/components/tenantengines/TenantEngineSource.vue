<template>
  <sw-content-tab :tabkey="tabkey" :loaded="true" loadingMessage="Loading...">
    <v-btn-toggle class="overlay" v-model="jsonChoice">
      <v-btn flat small>
        Tenant Engine
      </v-btn>
      <v-btn flat small>
        Microservice
      </v-btn>
      <v-btn flat small>
        Instance
      </v-btn>
    </v-btn-toggle>
    <editor
      ref="editor"
      class="editor"
      v-model="content"
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
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";

import Vue from "vue";
import { ITenantEngineConfiguration } from "sitewhere-rest-api";

@Component({
  components: {
    editor: require("vue2-ace-editor")
  }
})
export default class TenantMicroserviceConfiguration extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** References */
  $refs!: Refs<{
    editor: any;
  }>;

  jsonChoice: number = 0;
  aceOptions: {} = {
    showPrintMargin: false,
    readOnly: true
  };

  /** Get content based on choice */
  get content() {
    if (this.jsonChoice == 0) {
      return this.tenantEngineConfiguration || "";
    } else if (this.jsonChoice == 1) {
      return this.microserviceConfiguration || "";
    } else if (this.jsonChoice == 2) {
      return this.instanceConfiguration || "";
    }
  }

  /** Access the editor component */
  get editorComponent(): any {
    return this.$refs.editor.editor;
  }

  set content(updated: string) {}

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
  get instanceConfiguration(): string | null {
    return this.configuration
      ? JSON.stringify(this.configuration.instanceConfiguration, null, 2)
      : null;
  }

  /** Get JSON for microservice configuration */
  get microserviceConfiguration(): string | null {
    return this.configuration
      ? JSON.stringify(this.configuration.microserviceConfiguration, null, 2)
      : null;
  }

  /** Get JSON for tenant engine configuration */
  get tenantEngineConfiguration(): string | null {
    return this.configuration
      ? JSON.stringify(this.configuration.tenantConfiguration, null, 2)
      : null;
  }
}
</script>

<style scoped>
.editor {
  border-bottom: 1px solid #eee;
}
.overlay {
  position: absolute;
  top: 25px;
  right: 25px;
}
</style>
