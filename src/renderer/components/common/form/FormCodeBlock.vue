<template>
  <div class="mb-3">
    <v-input
      :required="required"
      :title="title"
      v-model="wrapped"
      hide-details
      :prepend-icon="icon"
    >
      <ace-editor
        style="border: 1px solid #999;"
        required
        v-model="wrapped"
        @init="editorInit"
        lang="groovy"
        theme="chrome"
        :options="aceOptions"
        width="100%"
        height="350"
      />
    </v-input>
    <div class="verror">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({
  components: {
    AceEditor: require("vue2-ace-editor")
  }
})
export default class FormCodeBlock extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly label!: string;
  @Prop({ default: "code" }) readonly icon!: string;
  @Prop() readonly required!: boolean;
  @Prop({ default: "" }) readonly value!: string;

  aceOptions: {} = {
    showPrintMargin: false,
    showLineNumbers: false
  };

  /** Initialize code editor by requiring dependencies */
  editorInit() {
    require("brace/ext/language_tools"); //language extension prerequsite...
    require("brace/mode/groovy");
    require("brace/mode/javascript"); //language
    require("brace/mode/less");
    require("brace/theme/chrome");
    require("brace/snippets/javascript"); //snippet
  }

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }
}
</script>
