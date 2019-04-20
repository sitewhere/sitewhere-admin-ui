<template>
  <dialog-form>
    <v-flex xs12>
      <form-text required label="Username" v-model="username" hide-details icon="info">
        <span v-if="$v.username.$invalid && $v.$dirty">Username is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text type="password" required label="Password" v-model="password" icon="https">
        <span v-if="!$v.password.required && $v.$dirty">Password is required.</span>
        <span v-if="!$v.password.minLength && $v.$dirty">Password minimum length is 6.</span>
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        type="password"
        required
        label="Password (confirm)"
        v-model="passwordConfirm"
        icon="https"
      >
        <span v-if="!$v.passwordConfirm.sameAsPassword && $v.$dirty">Password does not match.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text required label="First name" v-model="firstName" icon="info">
        <span v-if="$v.firstName.$invalid && $v.$dirty">First name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text required label="Last name" v-model="lastName" icon="info">
        <span v-if="$v.lastName.$invalid && $v.$dirty">Last name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-select
        required
        :items="statuses"
        v-model="status"
        label="Account status"
        icon="check_circle"
      >
        <span v-if="$v.status.$invalid && $v.$dirty">Account status is required.</span>
      </form-select>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { required, sameAs, minLength } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect
  },
  validations: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordConfirm: {
      sameAsPassword: sameAs("password")
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    status: {
      required
    }
  }
})
export default class TenantDetailFields extends DialogSection {
  username: string | null = null;
  password: string | null = null;
  passwordConfirm: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  status: string | null = null;

  // Content for dropdowns.
  statuses: { text: string; value: string }[] = [
    {
      text: "Active",
      value: "Active"
    },
    {
      text: "Expired",
      value: "Expired"
    },
    {
      text: "Locked",
      value: "Locked"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.username = null;
    this.password = null;
    this.passwordConfirm = null;
    this.firstName = null;
    this.lastName = null;
    this.status = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.username = (input as any).username;
    this.password = (input as any).password;
    this.firstName = (input as any).firstName;
    this.lastName = (input as any).lastName;
    this.status = (input as any).status;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      status: this.status
    };
  }
}
</script>

<style scoped>
</style>
