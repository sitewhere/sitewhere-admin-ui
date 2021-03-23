<template>
  <dialog-form>
    <v-flex xs12>
      <form-select
        :items="debugLevels"
        title="Choose pipeline debugging level"
        label="Debug Level"
        item-text="text"
        item-value="value"
        v-model="debugLevel"
        icon="bug"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import {
  DialogSection,
  DialogForm,
  FormSelect,
} from "sitewhere-ide-components";

import { IEventPipelineDebugging } from "sitewhere-rest-api";

@Component({
  components: { DialogForm, FormSelect },
  validations: {},
})
export default class PipelineDebuggingFields extends DialogSection {
  debugLevel = "warn";

  /** List of available debug levels to choose from */
  debugLevels: { text: string; value: string }[] = [
    {
      text: "Debug",
      value: "debug",
    },
    {
      text: "Info",
      value: "info",
    },
    {
      text: "Warning",
      value: "warn",
    },
    {
      text: "Error",
      value: "error",
    },
  ];

  /** Reset section content */
  reset(): void {
    this.debugLevel = "warn";
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(debugging: IEventPipelineDebugging): void {
    this.debugLevel = debugging.debugLevel;
  }

  /** Save form data to an object */
  save(): IEventPipelineDebugging {
    return {
      debugLevel: this.debugLevel,
    };
  }
}
</script>

