<template>
  <dialog-form>
    <v-flex xs12>
      <form-text title="URL that points to image" label="Image URL" v-model="imageUrl" icon="image">
        <span v-if="!$v.imageUrl.url && $v.$dirty">Image URL is not valid.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <icon-selector v-model="icon"/>
    </v-flex>
    <v-flex xs12>
      <color-input-field text="Background" v-model="backgroundColor"/>
    </v-flex>
    <v-flex xs12>
      <color-input-field text="Foreground" v-model="foregroundColor"/>
    </v-flex>
    <v-flex xs12>
      <color-input-field text="Border" v-model="borderColor"/>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { DialogSection } from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";
import FormSelect from "../common/form/FormSelect.vue";
import IconSelector from "../common/IconSelector.vue";
import ColorInputField from "../common/ColorInputField.vue";

import { url } from "vuelidate/lib/validators";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect,
    IconSelector,
    ColorInputField
  },
  validations: {
    imageUrl: { url }
  }
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
  load(input: {}): void {
    this.imageUrl = (input as any).imageUrl;
    this.icon = (input as any).icon;
    this.backgroundColor = (input as any).backgroundColor;
    this.foregroundColor = (input as any).foregroundColor;
    this.borderColor = (input as any).borderColor;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      imageUrl: this.imageUrl,
      icon: this.icon,
      backgroundColor: this.backgroundColor,
      foregroundColor: this.foregroundColor,
      borderColor: this.borderColor
    };
  }
}
</script>

<style scoped>
</style>
