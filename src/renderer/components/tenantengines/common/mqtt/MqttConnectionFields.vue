<template>
  <dialog-form>
    <v-flex xs2>
      <form-select
        :items="protocols"
        title="Choose connection protocol"
        label="Protocol"
        item-text="text"
        item-value="value"
        v-model="protocol"
        icon="lock"
      />
    </v-flex>
    <v-flex xs8>
      <form-text
        required
        label="Hostname"
        title="MQTT broker hostname."
        v-model="hostname"
        icon="router"
        class="ml-3 mr-3"
      >
        <span v-if="!$v.hostname.required && $v.$dirty"
          >Hostname is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs2>
      <form-text
        required
        label="Port"
        title="MQTT broker port."
        v-model="port"
        type="number"
      >
        <span v-if="!$v.port.required && $v.$dirty">Required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Topic"
        title="MQTT topic to listen on."
        v-model="topic"
        icon="arrow_forward"
        class="mb-4"
      >
        <span v-if="!$v.topic.required && $v.$dirty">Topic is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-select
        :items="qosValues"
        title="Choose quality of service (QoS)"
        label="QoS"
        item-text="text"
        item-value="value"
        v-model="qos"
        icon="done"
        class="mr-3"
      />
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Number of threads"
        title="Number of threads used to handle processing."
        v-model="numThreads"
        icon="settings"
        type="number"
      >
        <span v-if="!$v.numThreads.required && $v.$dirty"
          >Number of threads is required.</span
        >
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";
import { IMqttConnectionConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../common/form/DialogForm.vue";
import FormText from "../../../common/form/FormText.vue";
import FormSelect from "../../../common/form/FormSelect.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect
  },
  validations: {
    protocol: {
      required
    },
    hostname: {
      required
    },
    port: {
      required
    },
    topic: {
      required
    },
    qos: {
      required
    },
    numThreads: {
      required
    }
  }
})
export default class MqttConnectionFields extends DialogSection {
  protocol: string = "http";
  hostname: string | null = null;
  port: number = 1883;
  topic: string | null = null;
  qos: string = "at_most_once";
  numThreads: number = 3;

  protocols: { text: string; value: string }[] = [
    {
      text: "http",
      value: "http"
    },
    {
      text: "https",
      value: "https"
    }
  ];

  qosValues: { text: string; value: string }[] = [
    {
      text: "0 - At Most Once",
      value: "at_most_once"
    },
    {
      text: "1 - At Least Once",
      value: "at_least_once"
    },
    {
      text: "2 - Exactly Once",
      value: "exactly_once"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.protocol = "http";
    this.hostname = null;
    this.port = 1883;
    this.topic = null;
    this.qos = "at_most_once";
    this.numThreads = 3;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IMqttConnectionConfiguration): void {
    this.protocol = input.protocol || "http";
    this.hostname = input.hostname;
    this.port = input.port || 1883;
    this.topic = input.topic;
    this.qos = input.qos || "at_most_once";
    this.numThreads = input.numThreads || 3;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      protocol: this.protocol,
      hostname: this.hostname,
      port: this.port,
      topic: this.topic,
      qos: this.qos,
      numThreads: this.numThreads
    };
  }
}
</script>
