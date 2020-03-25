<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Broker name"
        title="Broker name."
        v-model="brokerName"
        icon="info"
      >
        <span v-if="!$v.brokerName.required && $v.$dirty"
          >Broker name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Transport URI"
        title="Transport URI."
        v-model="transportUri"
        icon="router"
      >
        <span v-if="!$v.transportUri.required && $v.$dirty"
          >Transport URI is required.</span
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
import { IActiveMqBrokerConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../../common/form/DialogForm.vue";
import FormText from "../../../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    brokerName: {
      required
    },
    transportUri: {
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
export default class ActiveMqBrokerFields extends DialogSection {
  brokerName: string = "sitewhere";
  transportUri: string = "";
  queueName: string = "sitewhere";
  numConsumers: number = 3;

  /** Reset section content */
  reset(): void {
    this.brokerName = "sitewhere";
    this.transportUri = "";
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
  load(input: IActiveMqBrokerConfiguration): void {
    this.brokerName = input.brokerName || "sitewhere";
    this.transportUri = input.transportUri || "";
    this.queueName = input.queueName || "sitewhere";
    this.numConsumers = input.numConsumers || 3;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      brokerName: this.brokerName,
      transportUri: this.transportUri,
      queueName: this.queueName,
      numConsumers: this.numConsumers
    };
  }
}
</script>
