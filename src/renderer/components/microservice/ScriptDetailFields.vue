<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Id"
        title="Unique identifier for script."
        v-model="scriptId"
        icon="info"
      >
        <span v-if="!$v.scriptId.required && $v.$dirty">Id is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for script."
        v-model="name"
        icon="info"
      >
        <span v-if="!$v.name.required && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="description"
        title="Script description."
        label="Description"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">Description is required.</span>
      </form-text-area>
    </v-flex>
    <v-flex xs12>
      <form-select
        required
        title="Script language/technology being used."
        :items="scriptTypes"
        v-model="scriptType"
        label="Script Type"
        item-text="text"
        item-value="value"
        icon="developer_board"
      >
        <span v-if="$v.scriptType.$invalid && $v.$dirty">Script type is required.</span>
      </form-select>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";
import FormTextArea from "../common/form/FormTextArea.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText,
    FormTextArea,
    FormSelect
  },
  validations: {
    scriptId: {
      required
    },
    name: {
      required
    },
    description: {
      required
    },
    scriptType: {
      required
    }
  }
})
export default class ScriptDetailFields extends DialogSection {
  scriptId: string | null = null;
  name: string | null = null;
  description: string | null = null;
  scriptType: string | null = null;

  scriptTypes: { text: string; value: string }[] = [
    {
      text: "Groovy",
      value: "groovy"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.scriptId = null;
    this.name = null;
    this.description = null;
    this.scriptType = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.scriptId = (input as any).id;
    this.name = (input as any).name;
    this.description = (input as any).description;
    this.scriptType = (input as any).type;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      id: this.scriptId,
      name: this.name,
      description: this.description,
      type: this.scriptType
    };
  }
}
</script>

<style scoped>
</style>
