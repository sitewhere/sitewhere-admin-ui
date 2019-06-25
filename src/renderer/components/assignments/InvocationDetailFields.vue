<template>
  <dialog-form>
    <v-flex xs12>
      <command-selector
        :deviceTypeToken="deviceTypeToken"
        v-model="commandToken"
        title="Command being invoked."
        @selected="onCommandSelected"
      >
        <span v-if="$v.commandToken.$invalid && $v.$dirty">Command is required.</span>
      </command-selector>
    </v-flex>
    <v-flex xs12>
      <v-card v-if="command" style="width: 100%;">
        <v-card-text>{{ command.description }}</v-card-text>
        <v-card-text class="pt-0" v-if="command.parameters.length">
          <v-flex xs12 v-for="(param) in command.parameters" :key="param.name">
            <v-text-field
              placeholder=" "
              :label="param.name"
              :required="param.required"
              v-model="parameters[param.name]"
            ></v-text-field>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop, DialogSection } from "sitewhere-ide-common";
import { IDeviceCommand } from "sitewhere-rest-api";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";
import CommandSelector from "../commands/CommandSelector.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText,
    CommandSelector
  },
  validations: {
    commandToken: {
      required
    }
  }
})
export default class InvocationDetailFields extends DialogSection {
  @Prop(String) readonly deviceTypeToken!: string;

  commandToken: string | null = null;
  command: IDeviceCommand | null = null;
  parameters: {} = {};

  /** Reset section content */
  reset(): void {
    this.commandToken = null;
    this.command = null;
    this.parameters = {};
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.commandToken = (input as any).commandToken;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      commandToken: this.commandToken,
      parameterValues: this.parameters
    };
  }

  /** Called when command is selected */
  onCommandSelected(command: IDeviceCommand) {
    this.command = command;
  }
}
</script>
