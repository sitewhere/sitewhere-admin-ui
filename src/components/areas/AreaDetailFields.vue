<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Area token"
        title="Unique token for referencing area."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text required label="Name" title="Name displayed for area." v-model="name" icon="info">
        <span v-if="!$v.name.required && $v.$dirty">Area name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <contained-area-type-selector
        v-model="areaTypeToken"
        :parentArea="parentArea"
        title="Type of area being created."
      >
        <span v-if="$v.areaTypeToken.$invalid && $v.$dirty">Area type is required.</span>
      </contained-area-type-selector>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="description"
        title="Description of area."
        label="Description"
        icon="info"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import {
  DialogSection,
  DialogForm,
  FormToken,
  FormText,
  FormTextArea,
} from "sitewhere-ide-components";

import ContainedAreaTypeSelector from "../areatypes/ContainedAreaTypeSelector.vue";

import { required, helpers } from "vuelidate/lib/validators";
import { IArea } from "sitewhere-rest-api";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormTextArea,
    ContainedAreaTypeSelector,
  },
  validations: {
    token: {
      required,
      validToken,
    },
    name: {
      required,
    },
    areaTypeToken: {
      required,
    },
  },
})
export default class AreaDetailFields extends DialogSection {
  @Prop() readonly parentArea!: IArea;

  token: string | null = null;
  name: string | null = null;
  areaTypeToken: string | null = null;
  description: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.areaTypeToken = null;
    this.description = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IArea): void {
    this.token = input.token;
    this.name = input.name;
    this.areaTypeToken = (input as any).areaType.token;
    this.description = input.description;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      areaTypeToken: this.areaTypeToken,
      description: this.description,
    };
  }
}
</script>
