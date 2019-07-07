<template>
  <dialog-form>
    <v-flex xs12>
      <form-select
        title="Script template to use for content."
        :items="scriptTemplates"
        v-model="template"
        label="Template"
        item-text="name"
        item-value="id"
        icon="library_books"
        @change="onTemplateUpdated"
      />
    </v-flex>
    <v-flex xs12>
      <form-code-block required label="Content" title="Script Content." v-model="content">
        <span v-if="$v.content.$invalid && $v.$dirty">Script content is required.</span>
      </form-code-block>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormCodeBlock from "../common/form/FormCodeBlock.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { AxiosResponse } from "axios";
import { required } from "vuelidate/lib/validators";
import {
  listScriptTemplates,
  getScriptTemplateContent
} from "../../rest/sitewhere-scripting-api";
import { IScriptTemplate } from "sitewhere-rest-api";

@Component({
  components: {
    DialogForm,
    FormCodeBlock,
    FormSelect
  },
  validations: {
    content: {
      required
    }
  }
})
export default class ScriptContentFields extends DialogSection {
  @Prop() readonly identifier!: string;

  template: string | null = null;
  content: string = "";
  scriptTemplates: IScriptTemplate[] = [];
  scriptTypes: { text: string; value: string }[] = [
    {
      text: "Groovy",
      value: "groovy"
    }
  ];
  aceOptions: {} = {
    showPrintMargin: false
  };

  /** Load list of script templates */
  async loadTemplates() {
    let response: AxiosResponse<IScriptTemplate[]> = await listScriptTemplates(
      this.$store,
      this.identifier
    );
    this.scriptTemplates = response.data;
  }

  /** Set content based on template when selection changes */
  async onTemplateUpdated(templateId: string) {
    let response: AxiosResponse<string> = await getScriptTemplateContent(
      this.$store,
      this.identifier,
      templateId
    );
    this.content = response.data;
  }

  /** Reset section content */
  reset(): void {
    this.template = null;
    this.content = "";
    this.$v.$reset();

    // Load script templates list.
    this.loadTemplates();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.content = (input as any).content;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      content: btoa(this.content)
    };
  }
}
</script>

<style scoped>
</style>
