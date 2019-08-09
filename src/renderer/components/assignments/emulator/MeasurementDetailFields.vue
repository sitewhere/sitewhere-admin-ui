<template>
  <dialog-form>
    <v-flex xs12>
      <form-text required label="Name" title="Measurement name." v-model="name" icon="info">
        <span v-if="!$v.name.required && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Value"
        title="Measurement value."
        v-model="value"
        type="number"
        icon="info"
      >
        <span v-if="!$v.value.required && $v.$dirty">Value is required.</span>
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../../common/form/DialogForm.vue";
import FormText from "../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    name: {
      required
    },
    value: {
      required
    }
  }
})
export default class MeasurementDetailFields extends DialogSection {
  name: string | null = null;
  value: number | null = null;

  /** Reset section content */
  reset(): void {
    this.name = null;
    this.value = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.name = (input as any).name;
    this.value = (input as any).value;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      name: this.name,
      value: this.value
    };
  }
}
</script>
