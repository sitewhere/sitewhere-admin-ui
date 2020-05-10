<template>
  <sw-dialog-form>
    <v-flex xs12>
      <sw-form-text
        required
        label="Token"
        title="Unique token for referencing command."
        v-model="token"
        icon="info"
      >
        <span v-if="!$v.token.required && $v.$dirty">Token is required.</span>
        <span v-if="!$v.token.validToken && $v.$dirty">Token is not valid.</span>
      </sw-form-text>
    </v-flex>
    <v-flex xs12>
      <sw-form-text
        required
        label="Name"
        title="Name displayed for command."
        v-model="name"
        icon="info"
      >
        <span v-if="!$v.name.required && $v.$dirty">Command name is required.</span>
      </sw-form-text>
    </v-flex>
    <v-flex xs12>
      <sw-form-text
        required
        label="Namespace"
        title="Command namespace."
        v-model="namespace"
        icon="info"
      >
        <span v-if="!$v.namespace.required && $v.$dirty">Namespace is required.</span>
      </sw-form-text>
    </v-flex>
    <v-flex xs12>
      <sw-form-text-area
        required
        v-model="description"
        title="Description of command."
        label="Description"
        icon="info"
      />
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    namespace: {
      required
    },
    description: {
      required
    }
  }
})
export default class CommandDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  namespace: string | null = null;
  description: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.namespace = null;
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
    this.namespace = (input as any).namespace;
    this.description = (input as any).description;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      namespace: this.namespace,
      description: this.description
    };
  }
}
</script>
