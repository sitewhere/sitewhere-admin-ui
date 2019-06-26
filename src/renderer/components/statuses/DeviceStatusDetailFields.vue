<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Token"
        title="Unique token for referencing status."
        v-model="token"
        icon="info"
      >
        <span v-if="!$v.token.required && $v.$dirty">Token is required.</span>
        <span v-if="!$v.token.validToken && $v.$dirty">Token is not valid.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text required label="Name" title="Status name." v-model="name" icon="info">
        <span v-if="!$v.name.required && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Status Code"
        title="Code used to represent status."
        v-model="code"
        icon="info"
      >
        <span v-if="!$v.code.required && $v.$dirty">Code is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs6>
      <sw-icon-selector v-model="icon"/>
    </v-flex>
    <v-flex xs6>
      <sw-color-input-field text="Border" v-model="borderColor"/>
    </v-flex>
    <v-flex xs6>
      <sw-color-input-field text="Background" v-model="backgroundColor"/>
    </v-flex>
    <v-flex xs6>
      <sw-color-input-field text="Foreground" v-model="foregroundColor"/>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    code: {
      required
    },
    icon: {
      required
    },
    backgroundColor: {
      required
    },
    foregroundColor: {
      required
    },
    borderColor: {
      required
    }
  }
})
export default class DeviceStatusDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  code: string | null = null;
  icon: string | null = null;
  backgroundColor: string | null = null;
  foregroundColor: string | null = null;
  borderColor: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.code = null;
    this.icon = null;
    this.backgroundColor = null;
    this.foregroundColor = null;
    this.borderColor = null;
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
    this.code = (input as any).code;
    this.icon = (input as any).icon;
    this.backgroundColor = (input as any).backgroundColor;
    this.foregroundColor = (input as any).foregroundColor;
    this.borderColor = (input as any).borderColor;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      code: this.code,
      icon: this.icon,
      backgroundColor: this.backgroundColor,
      foregroundColor: this.foregroundColor,
      borderColor: this.borderColor
    };
  }
}
</script>

<style scoped>
</style>
