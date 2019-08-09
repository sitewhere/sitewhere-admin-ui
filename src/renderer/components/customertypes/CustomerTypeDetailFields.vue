<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Customer type token"
        title="Unique token for referencing customer type."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for customer type."
        v-model="name"
        icon="info"
      >
        <span v-if="$v.name.$invalid && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="description"
        title="Customer type description."
        label="Description"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">Description is required.</span>
      </form-text-area>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormToken from "../common/form/FormToken.vue";
import FormText from "../common/form/FormText.vue";
import FormTextArea from "../common/form/FormTextArea.vue";
import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormTextArea
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    description: {
      required
    }
  }
})
export default class DeviceTypeDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  description: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.description = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.token = (input as any).token;
    this.name = (input as any).name;
    this.description = (input as any).description;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      description: this.description
    };
  }
}
</script>
