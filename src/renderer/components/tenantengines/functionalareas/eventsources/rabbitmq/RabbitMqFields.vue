<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Connection URI"
        title="Connection URI."
        v-model="connectionUri"
        icon="router"
      >
        <span v-if="!$v.connectionUri.required && $v.$dirty"
          >Connection URI is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs12>
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
    <v-flex xs6>
      <form-text
        required
        label="Reconnection interval"
        title="Reconnection interval (in seconds)."
        v-model="reconnectInterval"
        icon="settings"
        type="number"
      >
        <span v-if="!$v.reconnectInterval.required && $v.$dirty"
          >Number of consumers is required.</span
        >
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";
import { IRabbitMqConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../../common/form/DialogForm.vue";
import FormText from "../../../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    connectionUri: {
      required
    },
    queueName: {
      required
    },
    numConsumers: {
      required
    },
    reconnectInterval: {
      required
    }
  }
})
export default class RabbitMqFields extends DialogSection {
  connectionUri: string = "";
  queueName: string = "";
  numConsumers: number = 5;
  reconnectInterval: number = 10;

  /** Reset section content */
  reset(): void {
    this.connectionUri = "";
    this.queueName = "";
    this.numConsumers = 5;
    this.reconnectInterval = 10;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IRabbitMqConfiguration): void {
    this.connectionUri = input.connectionUri || "";
    this.queueName = input.queueName || "";
    this.numConsumers = input.numConsumers || 5;
    this.reconnectInterval = input.reconnectInterval || 10;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      connectionUri: this.connectionUri,
      queueName: this.queueName,
      numConsumers: this.numConsumers,
      reconnectInterval: this.reconnectInterval
    };
  }
}
</script>
