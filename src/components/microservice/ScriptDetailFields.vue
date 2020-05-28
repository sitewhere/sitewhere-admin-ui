<template>
  <sw-dialog-form>
    <v-flex xs6>
      <sw-form-text
        required
        label="Id"
        title="Unique identifier for script."
        v-model="scriptId"
        icon="search"
        class="mr-3"
      >
        <span v-if="!$v.scriptId.required && $v.$dirty">Id is required.</span>
        <span v-if="!$v.scriptId.validId && $v.$dirty">Id must be alphanumeric with no spaces.</span>
      </sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        label="Name"
        title="Name displayed for script."
        v-model="name"
        icon="info"
      >
        <span v-if="!$v.name.required && $v.$dirty">Name is required.</span>
      </sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-select
        required
        title="Category script belongs to."
        :items="scriptCategories"
        v-model="category"
        label="Script Category"
        item-text="name"
        item-value="id"
        icon="developer_board"
        class="mr-3"
      >
        <span v-if="$v.category.$invalid && $v.$dirty">Script category is required.</span>
      </sw-form-select>
    </v-flex>
    <v-flex xs6>
      <sw-form-select
        required
        title="Script language/interpreter being used."
        :items="interpreterTypes"
        v-model="interpreterType"
        label="Script Interpreter"
        item-text="text"
        item-value="value"
        icon="fa-code"
      >
        <span v-if="$v.interpreterType.$invalid && $v.$dirty">Script interpreter is required.</span>
      </sw-form-select>
    </v-flex>
    <v-flex xs12>
      <sw-form-text-area
        required
        v-model="description"
        title="Script description."
        label="Description"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">Description is required.</span>
      </sw-form-text-area>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import { IScriptCategory, IScriptCreateRequest } from "sitewhere-rest-api";

import { required, helpers } from "vuelidate/lib/validators";

/** Validation for id */
const validId = helpers.regex("validId", /^[a-zA-Z0-9-_]+$/);

@Component({
  validations: {
    scriptId: {
      required,
      validId
    },
    name: {
      required
    },
    category: {
      required
    },
    interpreterType: {
      required
    },
    description: {
      required
    }
  }
})
export default class ScriptDetailFields extends DialogSection {
  @Prop() readonly scriptCategories!: IScriptCategory[];

  scriptId: string | null = null;
  name: string | null = null;
  category: string | null = null;
  description: string | null = null;
  interpreterType = "js";

  interpreterTypes: { text: string; value: string }[] = [
    {
      text: "JavaScript",
      value: "js"
    }
  ];

  @Watch("category", { immediate: true })
  onCategoryUpdated(updated: string) {
    this.$emit("categoryUpdated", updated);
  }

  /** Reset section content */
  reset(): void {
    this.scriptId = null;
    this.name = null;
    this.category = null;
    this.description = null;
    this.interpreterType = "js";
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IScriptCreateRequest): void {
    this.scriptId = input.id;
    this.name = input.name;
    this.category = input.category;
    this.description = input.description;
    this.interpreterType = input.interpreterType;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      id: this.scriptId,
      name: this.name,
      category: this.category,
      description: this.description,
      interpreterType: this.interpreterType
    };
  }
}
</script>

<style scoped></style>
