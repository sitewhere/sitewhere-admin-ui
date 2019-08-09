<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Device token"
        title="Unique token for referencing device."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <device-type-selector v-model="deviceTypeToken" title="Type of device being created.">
        <span v-if="$v.deviceTypeToken.$invalid && $v.$dirty">Device type is required.</span>
      </device-type-selector>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="comments"
        title="Extra comments about device."
        label="Comments"
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
import DeviceTypeSelector from "../devicetypes/DeviceTypeSelector.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormTextArea,
    DeviceTypeSelector
  },
  validations: {
    token: {
      required,
      validToken
    },
    deviceTypeToken: {
      required
    }
  }
})
export default class DeviceDetailFields extends DialogSection {
  token: string | null = null;
  deviceTypeToken: string | null = null;
  comments: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.deviceTypeToken = null;
    this.comments = null;
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
    this.deviceTypeToken = (input as any).deviceType.token;
    this.comments = (input as any).comments;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      deviceTypeToken: this.deviceTypeToken,
      comments: this.comments
    };
  }
}
</script>
