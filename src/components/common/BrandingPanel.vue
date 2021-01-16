<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        title="URL that points to image"
        label="Image URL"
        v-model="imageUrl"
        icon="image"
      >
        <span v-if="!$v.imageUrl.url && $v.$dirty"
          >Image URL is not valid.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <icon-selector v-model="icon" />
    </v-flex>
    <v-flex xs6>
      <color-input-field label="Border" v-model="borderColor" />
    </v-flex>
    <v-flex xs6>
      <color-input-field label="Background" v-model="backgroundColor" />
    </v-flex>
    <v-flex xs6>
      <color-input-field label="Foreground" v-model="foregroundColor" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import { IBrandedEntity } from "sitewhere-rest-api";

import { DialogSection, DialogForm, FormText } from "sitewhere-ide-components";
import IconSelector from "./form/IconSelector.vue";
import ColorInputField from "./form/ColorInputField.vue";

import { VFlex } from "vuetify/lib";

import { url } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText,
    IconSelector,
    ColorInputField,
    VFlex,
  },
  validations: {
    imageUrl: { url },
  },
})
export default class BrandingPanel extends DialogSection {
  imageUrl: string | null = null;
  icon: string | null = null;
  backgroundColor: string | null = null;
  foregroundColor: string | null = null;
  borderColor: string | null = null;

  /** Reset section content */
  reset(): void {
    this.imageUrl = null;
    this.icon = null;
    this.backgroundColor = null;
    this.foregroundColor = null;
    this.borderColor = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IBrandedEntity): void {
    this.imageUrl = input.imageUrl;
    this.icon = input.icon;
    this.backgroundColor = input.backgroundColor;
    this.foregroundColor = input.foregroundColor;
    this.borderColor = input.borderColor;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      imageUrl: this.imageUrl,
      icon: this.icon,
      backgroundColor: this.backgroundColor,
      foregroundColor: this.foregroundColor,
      borderColor: this.borderColor,
    };
  }
}
</script>
