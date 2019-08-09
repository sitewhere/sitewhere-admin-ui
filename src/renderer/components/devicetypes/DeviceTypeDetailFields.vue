<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Device type token"
        title="Unique token for referencing device type."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for device type."
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
        title="Device type description."
        label="Description"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">Description is required.</span>
      </form-text-area>
    </v-flex>
    <v-flex xs12>
      <form-select
        required
        title="Template used for initial tenant configuration."
        :items="containerPolicies"
        v-model="containerPolicy"
        label="Container Policy"
        item-text="text"
        item-value="value"
        icon="developer_board"
      >
        <span v-if="$v.containerPolicy.$invalid && $v.$dirty">Container policy is required.</span>
      </form-select>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormToken from "../common/form/FormToken.vue";
import FormText from "../common/form/FormText.vue";
import FormTextArea from "../common/form/FormTextArea.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormTextArea,
    FormSelect
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
    },
    containerPolicy: {
      required
    }
  }
})
export default class DeviceTypeDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  description: string | null = null;
  containerPolicy: string | null = null;

  containerPolicies: { text: string; value: string }[] = [
    {
      text: "Standalone Device",
      value: "Standalone"
    },
    {
      text: "Composite Device",
      value: "Composite"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.description = null;
    this.containerPolicy = null;
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
    this.containerPolicy = (input as any).containerPolicy;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      description: this.description,
      containerPolicy: this.containerPolicy
    };
  }
}
</script>

<style scoped>
</style>
