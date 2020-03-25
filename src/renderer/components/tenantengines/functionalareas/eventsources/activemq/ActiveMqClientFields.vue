<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Remote URI"
        title="Remote URI."
        v-model="remoteUri"
        icon="router"
      >
        <span v-if="!$v.remoteUri.required && $v.$dirty"
          >Remote URI is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Queue name"
        title="Queue name."
        v-model="queueName"
        icon="info"
        class="mr-3"
      >
        <span v-if="!$v.queueName.required && $v.$dirty"
          >Queue name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Number of consumers"
        title="Number of consumers."
        v-model="numConsumers"
        icon="settings"
        type="number"
      >
        <span v-if="!$v.numConsumers.required && $v.$dirty"
          >Number of consumers is required.</span
        >
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";
import { IActiveMqClientConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../../common/form/DialogForm.vue";
import FormText from "../../../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    remoteUri: {
      required
    },
    queueName: {
      required
    },
    numConsumers: {
      required
    }
  }
})
export default class ActiveMqClientFields extends DialogSection {
  remoteUri: string = "";
  queueName: string = "sitewhere";
  numConsumers: number = 3;

  /** Reset section content */
  reset(): void {
    this.remoteUri = "";
    this.queueName = "sitewhere";
    this.numConsumers = 3;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IActiveMqClientConfiguration): void {
    this.remoteUri = input.remoteUri || "";
    this.queueName = input.queueName || "sitewhere";
    this.numConsumers = input.numConsumers || 3;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      remoteUri: this.remoteUri,
      queueName: this.queueName,
      numConsumers: this.numConsumers
    };
  }
}
</script>
