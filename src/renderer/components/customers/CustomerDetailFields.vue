<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Customer token"
        title="Unique token for referencing customer."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for customer."
        v-model="name"
        icon="info"
      >
        <span v-if="!$v.name.required && $v.$dirty">Customer name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <customer-type-selector v-model="customerTypeToken" title="Type of customer being created.">
        <span v-if="$v.customerTypeToken.$invalid && $v.$dirty">Customer type is required.</span>
      </customer-type-selector>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="description"
        title="Description of customer."
        label="Description"
        icon="info"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormToken from "../common/form/FormToken.vue";
import FormText from "../common/form/FormText.vue";
import FormTextArea from "../common/form/FormTextArea.vue";
import CustomerTypeSelector from "../customertypes/CustomerTypeSelector.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormTextArea,
    CustomerTypeSelector
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    customerTypeToken: {
      required
    }
  }
})
export default class CustomerDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  customerTypeToken: string | null = null;
  description: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.customerTypeToken = null;
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
    this.customerTypeToken = (input as any).customerType.token;
    this.description = (input as any).description;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      customerTypeToken: this.customerTypeToken,
      description: this.description
    };
  }
}
</script>
