<template>
  <dialog-form>
    <v-flex xs11>
      <form-select
        title="Script template to use for content."
        :items="scriptTemplates"
        v-model="template"
        label="Template"
        item-text="name"
        item-value="id"
        icon="library_books"
      />
    </v-flex>
    <v-flex xs1>
      <v-btn icon small class="ma-3 grey--text" @click="onCopyClicked"
        ><v-icon small>fa-copy</v-icon></v-btn
      >
    </v-flex>
    <v-flex xs12>
      <form-code-block
        required
        label="Content"
        title="Script Content."
        v-model="content"
      >
        <span v-if="$v.content.$invalid && $v.$dirty"
          >Script content is required.</span
        >
      </form-code-block>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop, Watch, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormCodeBlock from "../common/form/FormCodeBlock.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { AxiosResponse } from "axios";
import { required } from "vuelidate/lib/validators";
import { listScriptTemplates } from "../../rest/sitewhere-scripting-api";
import { IScriptTemplate } from "sitewhere-rest-api";
import { IScriptCreateRequest } from "../../../../../sitewhere-rest-api/src";

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
  @Prop() readonly category!: string;

  template: string | null = null;
  content: string = "";
  scriptTemplates: IScriptTemplate[] = [];

  aceOptions: {} = {
    showPrintMargin: false
  };

  @Watch("category", { immediate: true })
  onCategoryUpdated(updated: string) {
    this.loadTemplates();
  }

  /** Load list of script templates */
  async loadTemplates() {
    if (this.category) {
      let response: AxiosResponse<IScriptTemplate[]> = await listScriptTemplates(
        this.$store,
        this.identifier,
        this.category
      );
      this.scriptTemplates = response.data;
      if (this.scriptTemplates.length > 0) {
        this.template = this.scriptTemplates[0].id;
      }
    }
  }

  /** Called to copy content of selected template */
  onCopyClicked(): void {
    this.scriptTemplates.forEach(template => {
      if (template.id == this.template) {
        this.content = template.script;
      }
    });
  }

  /** Reset section content */
  reset(): void {
    this.template = null;
    this.content = "";
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IScriptCreateRequest): void {
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

<style scoped></style>
