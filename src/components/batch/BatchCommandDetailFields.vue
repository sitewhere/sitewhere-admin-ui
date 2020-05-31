<template>
  <dialog-form>
    <v-flex xs12>
      <v-select
        :items="commands"
        v-model="commandToken"
        label="Command"
        item-text="name"
        item-value="token"
        light
        single-line
        auto
        prepend-icon="flash_on"
        hide-details
      ></v-select>
    </v-flex>
    <v-flex xs12 v-if="command">
      <v-card style="width: 100%;">
        <v-card-text>{{ command.description }}</v-card-text>
        <v-card-text class="pt-0" v-if="command.parameters.length">
          <v-flex xs12 v-for="(param) in command.parameters" :key="param.name">
            <v-text-field
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
import { Component, Prop, Watch } from "vue-property-decorator";
import { listDeviceCommands } from "sitewhere-ide-common";

import { DialogSection, DialogForm } from "sitewhere-ide-components";

import { AxiosResponse } from "axios";
import {
  IDeviceCommand,
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandSearchResults
} from "sitewhere-rest-api";

@Component({ components: { DialogForm } })
export default class BatchCommandDetailFields extends DialogSection {
  @Prop() readonly deviceTypeToken!: string;

  command: IDeviceCommand | null = null;
  commands: IDeviceCommand[] = [];
  commandToken: string | null = null;
  parameters: {} = {};

  /** Reset section content */
  reset(): void {
    this.command = null;
    this.commands = [];
    this.loadDeviceCommands();
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {
    console.log(input);
  }

  /** Load device commands asynchronously */
  async loadDeviceCommands() {
    const criteria: IDeviceCommandSearchCriteria = {
      deviceTypeToken: this.deviceTypeToken
    };
    const format: IDeviceCommandResponseFormat = {};
    const response: AxiosResponse<IDeviceCommandSearchResults> = await listDeviceCommands(
      this.$store,
      criteria,
      format
    );
    this.commands = response.data.results;
  }

  @Watch("commandToken")
  onCommandSelected(updated: string) {
    if (this.commands) {
      this.commands.forEach(command => {
        if (command.token === updated) {
          this.command = command;
        }
      });
    }
  }

  /** Save form data to an object */
  save(): {} {
    return {
      commandToken: this.commandToken,
      parameterValues: this.parameters
    };
  }
}
</script>
