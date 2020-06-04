<template>
  <dialog-form>
    <v-flex xs12>
      <form-select
        :items="destinations"
        title="Choose default command destination"
        label="Default Destination"
        item-text="id"
        item-value="id"
        v-model="defaultDestination"
        icon="fa-check"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import { VFlex } from "vuetify/lib";
import {
  DialogSection,
  DialogForm,
  FormSelect
} from "sitewhere-ide-components";

import {
  ICommandDestinationGenericConfiguration,
  IDeviceTypeMappingRouterConfiguration
} from "sitewhere-configuration-model";
import { required } from "vuelidate/lib/validators";

@Component({
  components: { VFlex, DialogSection, DialogForm, FormSelect },
  validations: {
    defaultDestination: {
      required
    }
  }
})
export default class SettingsFields extends DialogSection {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];

  defaultDestination: string | null = null;
  configuration!: IDeviceTypeMappingRouterConfiguration;

  /** Reset section content */
  reset(): void {
    this.defaultDestination = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IDeviceTypeMappingRouterConfiguration): void {
    this.configuration = input;
    this.defaultDestination = input.defaultDestination || null;
  }

  /** Save form data to an object */
  save(): IDeviceTypeMappingRouterConfiguration {
    return {
      mappings: [],
      defaultDestination: this.defaultDestination || ""
    };
  }
}
</script>
