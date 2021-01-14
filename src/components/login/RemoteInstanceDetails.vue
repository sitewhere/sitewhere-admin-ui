<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for remote."
        v-model="name"
        icon="info"
      >
        <span v-if="!$v.name.required && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs11>
      <form-text
        required
        label="Instance URL"
        title="Base URL for instance."
        v-model="baseUrl"
        icon="link"
      >
        <span v-if="!$v.baseUrl.required && $v.$dirty"
          >Instance URL is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs1>
      <v-spacer />
      <v-btn
        icon
        outlined
        color="primary"
        class="mt-1 ml-4"
        @click="onCreateClicked"
      >
        <v-icon>add</v-icon>
      </v-btn>
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

import { generateUniqueId, IRemoteInstance } from "sitewhere-ide-common";

import { required } from "vuelidate/lib/validators";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { Validation } from "vuelidate";

@Component({
  components: { DialogForm, FormText, FormSelect },
  validations: {
    name: {
      required,
    },
    baseUrl: {
      required,
    },
  },
})
export default class RemoteInstanceDetails extends DialogSection {
  name: string | null = null;
  baseUrl: string | null = null;

  /** Reset section content */
  reset(): void {
    this.name = null;
    this.baseUrl = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: { name: string; baseUrl: string }): void {
    this.name = input.name;
    this.baseUrl = input.baseUrl;
  }

  /** Save form data to an object */
  save(): IRemoteInstance {
    return {
      id: generateUniqueId(),
      name: this.name || "",
      baseUrl: this.baseUrl || "",
    };
  }

  /** Called when create button is clicked */
  onCreateClicked() {
    const added: IRemoteInstance = this.save() as IRemoteInstance;
    this.$emit("added", added);
    this.reset();
  }
}
</script>
