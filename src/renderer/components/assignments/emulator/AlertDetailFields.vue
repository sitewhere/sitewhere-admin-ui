<template>
  <sw-dialog-form>
    <v-flex xs12>
      <sw-form-text
        required
        label="Type"
        title="Type indicator associated with alert."
        v-model="type"
        icon="info"
      >
        <span v-if="!$v.type.required && $v.$dirty">Alert type is required.</span>
      </sw-form-text>
    </v-flex>
    <v-flex xs12>
      <sw-form-select
        required
        title="Indicator for alert severity"
        :items="alertLevels"
        v-model="level"
        label="Level"
        item-text="text"
        item-value="value"
        icon="info"
      >
        <span v-if="!$v.level.required && $v.$dirty">Alert level is required.</span>
      </sw-form-select>
    </v-flex>
    <v-flex xs12>
      <sw-form-text
        required
        label="Message"
        title="Alert detail message."
        v-model="message"
        icon="info"
      >
        <span v-if="!$v.message.required && $v.$dirty">Alert message is required.</span>
      </sw-form-text>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    type: {
      required
    },
    level: {
      required
    },
    message: {
      required
    }
  }
})
export default class AlertDetailFields extends DialogSection {
  type: string | null = null;
  level: string | null = null;
  message: string | null = null;

  alertLevels: { text: string; value: string }[] = [
    {
      text: "Information",
      value: "Info"
    },
    {
      text: "Warning",
      value: "Warning"
    },
    {
      text: "Error",
      value: "Error"
    },
    {
      text: "Critical",
      value: "Critical"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.type = null;
    this.level = null;
    this.message = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.type = (input as any).type;
    this.level = (input as any).level;
    this.message = (input as any).message;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      type: this.type,
      level: this.level,
      message: this.message,
      source: "Device"
    };
  }
}
</script>
