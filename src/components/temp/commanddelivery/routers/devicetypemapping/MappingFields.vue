<template>
  <dialog-form>
    <v-flex xs12>
      <form-select
        :items="deviceTypes"
        title="Choose device type to map"
        label="Device Type"
        item-text="name"
        item-value="token"
        v-model="deviceType"
        icon="settings"
      />
    </v-flex>
    <v-flex xs12 class="mb-2">
      <form-select
        :items="destinations"
        title="Choose command destination"
        label="Command Destination"
        item-text="id"
        item-value="id"
        v-model="destination"
        icon="fa-sitemap"
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
  IDeviceTypeMapping
} from "sitewhere-configuration-model";
import { IDeviceType } from "sitewhere-rest-api";

import { required } from "vuelidate/lib/validators";

@Component({
  components: { VFlex, DialogSection, DialogForm, FormSelect },
  validations: {
    deviceType: {
      required
    },
    destination: {
      required
    }
  }
})
export default class MappingsFields extends DialogSection {
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Prop() readonly deviceTypes!: IDeviceType[];

  deviceType: string | null = null;
  destination: string | null = null;

  /** Reset section content */
  reset(): void {
    this.deviceType = null;
    this.destination = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IDeviceTypeMapping): void {
    this.deviceType = input.deviceTypeToken;
    this.destination = input.destinationId;
  }

  /** Save form data to an object */
  save(): IDeviceTypeMapping {
    return {
      deviceTypeToken: this.deviceType || "",
      destinationId: this.destination || ""
    };
  }
}
</script>
