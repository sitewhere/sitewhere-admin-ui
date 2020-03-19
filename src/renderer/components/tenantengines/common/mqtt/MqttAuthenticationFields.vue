<template>
  <dialog-form>
    <v-flex xs7>
      <form-text
        label="Username"
        title="Username for authentication."
        v-model="username"
        icon="account_circle"
        class="mr-3"
      />
    </v-flex>
    <v-flex xs5>
      <form-text
        label="Password"
        title="Password for authentication."
        v-model="password"
        icon="lock"
        type="password"
      />
    </v-flex>
    <v-flex xs7>
      <form-text
        label="Truststore path"
        title="Truststore path."
        v-model="trustStorePath"
        icon="info"
        class="mr-3"
      />
    </v-flex>
    <v-flex xs5>
      <form-text
        label="Truststore password"
        title="Truststore password."
        v-model="trustStorePassword"
        icon="lock"
        type="password"
      />
    </v-flex>
    <v-flex xs7>
      <form-text
        label="Keystore path"
        title="Keystore path."
        v-model="keyStorePath"
        icon="info"
        class="mr-3"
      />
    </v-flex>
    <v-flex xs5>
      <form-text
        label="Keystore password"
        title="Keystore password."
        v-model="keyStorePassword"
        icon="lock"
        type="password"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";
import { IMqttConnectionConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../common/form/DialogForm.vue";
import FormText from "../../../common/form/FormText.vue";
import FormSelect from "../../../common/form/FormSelect.vue";

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect
  },
  validations: {}
})
export default class MqttAuthenticationFields extends DialogSection {
  username: string | null = null;
  password: string | null = null;
  clientId: string | null = null;
  cleanSession: boolean | null = null;
  trustStorePath: string | null = null;
  trustStorePassword: string | null = null;
  keyStorePath: string | null = null;
  keyStorePassword: string | null = null;

  /** Reset section content */
  reset(): void {
    this.username = null;
    this.password = null;
    this.clientId = null;
    this.cleanSession = null;
    this.trustStorePath = null;
    this.trustStorePassword = null;
    this.keyStorePath = null;
    this.keyStorePassword = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IMqttConnectionConfiguration): void {
    this.username = input.username;
    this.password = input.password;
    this.clientId = input.clientId;
    this.cleanSession = input.cleanSession;
    this.trustStorePath = input.trustStorePath;
    this.trustStorePassword = input.trustStorePassword;
    this.keyStorePath = input.keyStorePath;
    this.keyStorePassword = input.keyStorePassword;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      username: this.username,
      password: this.password,
      clientId: this.clientId,
      cleanSession: this.cleanSession,
      trustStorePath: this.trustStorePath,
      trustStorePassword: this.trustStorePassword,
      keyStorePath: this.keyStorePath,
      keyStorePassword: this.keyStorePassword
    };
  }
}
</script>
