<template>
  <dialog-form>
    <v-flex xs12>
      <map-with-zone-overlay-panel
        height="370px"
        style="border: 1px solid #ccc;"
        :area="area"
        :editedZoneToken="token"
        :bounds="bounds"
        :borderColor="borderColor"
        :fillColor="fillColor"
        :fillOpacity="opacity"
        @boundsUpdated="onBoundsUpdated"
      />
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              required
              label="Token"
              v-model="token"
              placeholder=" "
              hide-details
              prepend-icon="info"
            ></v-text-field>
            <div class="verror">
              <span v-if="!$v.token.required && $v.$dirty">Token is required.</span>
              <span v-if="!$v.token.validToken && $v.$dirty">Token is not valid.</span>
            </div>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              required
              hide-details
              label="Zone name"
              v-model="name"
              placeholder=" "
              prepend-icon="info"
            ></v-text-field>
            <div class="verror">
              <span v-if="$v.name.$invalid && $v.$dirty">Zone name is required.</span>
            </div>
          </v-flex>
          <v-flex xs2>
            <sw-color-picker text="Border" v-model="borderColor" />
          </v-flex>
          <v-flex xs2>
            <sw-color-picker
              text="Fill"
              v-model="fillColor"
              @opacityChanged="onFillOpacityUpdated"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection, Prop } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import MapWithZoneOverlayPanel from "./MapWithZoneOverlayPanel.vue";

import { required, helpers } from "vuelidate/lib/validators";
import { ILocation, IArea } from "sitewhere-rest-api";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    MapWithZoneOverlayPanel
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    borderColor: {
      required
    },
    fillColor: {
      required
    },
    opacity: {
      required
    }
  }
})
export default class AreaDetailFields extends DialogSection {
  @Prop() readonly area!: IArea;

  token: string | null = null;
  name: string | null = null;
  bounds: ILocation[] = [];
  borderColor: string | null = null;
  fillColor: string | null = null;
  opacity: number | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.bounds = [];
    this.borderColor = "#333333";
    this.fillColor = "#dc0000";
    this.opacity = 1.0;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.token = (input as any).token;
    this.name = (input as any).name;
    this.bounds = (input as any).bounds;
    this.borderColor = (input as any).borderColor;
    this.fillColor = (input as any).fillColor;
    this.opacity = (input as any).opacity;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      bounds: this.bounds,
      borderColor: this.borderColor,
      fillColor: this.fillColor,
      opacity: this.opacity
    };
  }
  /** Called when zone bounds are updated */
  onBoundsUpdated(bounds: ILocation[]) {
    this.bounds = bounds;
  }

  /** Called when zone opacity value is updated */
  onFillOpacityUpdated(opacity: number) {
    this.opacity = opacity;
  }
}
</script>
