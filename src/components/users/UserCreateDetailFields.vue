<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Username"
        v-model="username"
        hide-details
        icon="info"
      >
        <span v-if="$v.username.$invalid && $v.$dirty"
          >Username is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        type="password"
        required
        label="Password"
        v-model="password"
        icon="https"
      >
        <span v-if="!$v.password.required && $v.$dirty"
          >Password is required.</span
        >
        <span v-if="!$v.password.minLength && $v.$dirty"
          >Password minimum length is 6.</span
        >
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
        <span v-if="!$v.passwordConfirm.sameAsPassword && $v.$dirty"
          >Password does not match.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text required label="First name" v-model="firstName" icon="info">
        <span v-if="$v.firstName.$invalid && $v.$dirty"
          >First name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text required label="Last name" v-model="lastName" icon="info">
        <span v-if="$v.lastName.$invalid && $v.$dirty"
          >Last name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text required label="Email Address" v-model="email" icon="info">
        <span v-if="$v.email.$invalid && $v.$dirty"
          >Invalid email address entered.</span
        >
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import {
  DialogSection,
  DialogForm,
  FormText,
  FormSelect,
} from "sitewhere-ide-components";

import { required, sameAs, minLength, email } from "vuelidate/lib/validators";

@Component({
  components: { DialogForm, FormText, FormSelect },
  validations: {
    username: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    passwordConfirm: {
      sameAsPassword: sameAs("password"),
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      email,
    },
  },
})
export default class UserCreateDetailFields extends DialogSection {
  username: string | null = null;
  password: string | null = null;
  passwordConfirm: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;

  /** Reset section content */
  reset(): void {
    this.username = null;
    this.password = null;
    this.passwordConfirm = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
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
    this.email = (input as any).email;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }
}
</script>
