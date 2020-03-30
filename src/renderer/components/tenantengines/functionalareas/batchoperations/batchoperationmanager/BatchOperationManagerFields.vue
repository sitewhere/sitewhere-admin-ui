<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Throttle delay(ms)"
        title="Throttle delay in milliseconds."
        v-model="throttleDelayMs"
        icon="fa-clock"
        type="number"
      >
        <span v-if="!$v.throttleDelayMs.required && $v.$dirty"
          >Throttle delay is required.</span
        >
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";
import { IBatchOperationManagerConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../../common/form/DialogForm.vue";
import FormText from "../../../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    throttleDelayMs: {
      required
    }
  }
})
export default class BatchOperationManagerFields extends DialogSection {
  throttleDelayMs: number = 0;

  /** Reset section content */
  reset(): void {
    this.throttleDelayMs = 0;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IBatchOperationManagerConfiguration): void {
    console.log("load from", input);
    this.throttleDelayMs = input.throttleDelayMs || 0;
  }

  /** Save form data to an object */
  save(): IBatchOperationManagerConfiguration {
    return {
      throttleDelayMs: this.throttleDelayMs
    };
  }
}
</script>
