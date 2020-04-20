<template>
  <sw-dialog-form>
    <v-flex xs12>
      <sw-form-token
        required
        label="Device group token"
        title="Unique token for referencing device group."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <sw-form-text
        required
        label="Name"
        title="Name displayed for device group."
        v-model="name"
        icon="info"
      >
        <span v-if="$v.name.$invalid && $v.$dirty">Name is required.</span>
      </sw-form-text>
    </v-flex>
    <v-flex xs12>
      <sw-form-text-area
        required
        v-model="description"
        title="Device group description."
        label="Description"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">Description is required.</span>
      </sw-form-text-area>
    </v-flex>
    <v-flex xs12>
      <roles-field icon="info" v-model="roles" />
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import RolesField from "./RolesField.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    RolesField
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
export default class DeviceGroupDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  description: string | null = null;
  roles: string[] = [];

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.description = null;
    this.roles = [];
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
    this.roles = (input as any).roles;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      description: this.description,
      roles: this.roles
    };
  }
}
</script>

<style scoped>
</style>
