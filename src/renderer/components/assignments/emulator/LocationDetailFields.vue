<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Latitude"
        title="Location latitude."
        v-model="latitude"
        type="number"
        icon="language"
      >
        <span v-if="!$v.latitude.required && $v.$dirty">Latitude is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Longitude"
        title="Location longitude."
        v-model="longitude"
        type="number"
        icon="language"
      >
        <span v-if="!$v.longitude.required && $v.$dirty">Longitude is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Elevation"
        title="Location elevation."
        v-model="elevation"
        type="number"
        icon="flight_takeoff"
      >
        <span v-if="!$v.elevation.required && $v.$dirty">Elevation is required.</span>
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../../common/form/DialogForm.vue";
import FormText from "../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    latitude: {
      required
    },
    longitude: {
      required
    },
    elevation: {
      required
    }
  }
})
export default class LocationDetailFields extends DialogSection {
  latitude: number | null = null;
  longitude: number | null = null;
  elevation: number | null = null;

  /** Reset section content */
  reset(): void {
    this.latitude = null;
    this.longitude = null;
    this.elevation = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.latitude = (input as any).latitude;
    this.longitude = (input as any).longitude;
    this.elevation = (input as any).elevation;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      elevation: this.elevation
    };
  }
}
</script>
