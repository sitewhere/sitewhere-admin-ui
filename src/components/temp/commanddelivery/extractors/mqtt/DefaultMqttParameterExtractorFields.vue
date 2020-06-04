<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        label="Command topic expression"
        title="Expression used to determine command MQTT topic."
        v-model="commandTopicExpression"
        icon="settings"
        class="mr-3"
      >
        <span
          v-if="!$v.commandTopicExpression.required && $v.$dirty"
        >Command topic expression is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        label="System topic expression"
        title="Expression used to determine system MQTT topic."
        v-model="systemTopicExpression"
        icon="settings"
        class="mr-3"
      >
        <span
          v-if="!$v.systemTopicExpression.required && $v.$dirty"
        >System topic expression is required.</span>
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import { DialogSection, DialogForm, FormText } from "sitewhere-ide-components";
import { VFlex } from "vuetify/lib";

import { IDefaultMqttParameterExtractorConfiguration } from "sitewhere-configuration-model";

import { required } from "vuelidate/lib/validators";

@Component({
  components: { VFlex, DialogSection, DialogForm, FormText },
  validations: {
    commandTopicExpression: {
      required
    },
    systemTopicExpression: {
      required
    }
  }
})
export default class DefaultMqttParameterExtractorFields extends DialogSection {
  @Prop() readonly tenantId!: string;

  commandTopicExpression: string | null = null;
  systemTopicExpression: string | null = null;

  /** Reset section content */
  reset(): void {
    this.commandTopicExpression = null;
    this.systemTopicExpression = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IDefaultMqttParameterExtractorConfiguration): void {
    this.commandTopicExpression = input.commandTopicExpression;
    this.systemTopicExpression = input.systemTopicExpression;
  }

  /** Save form data to an object */
  save(): IDefaultMqttParameterExtractorConfiguration {
    return {
      commandTopicExpression: this.commandTopicExpression || "",
      systemTopicExpression: this.systemTopicExpression || ""
    };
  }
}
</script>
