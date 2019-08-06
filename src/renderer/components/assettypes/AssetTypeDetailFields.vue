<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Asset type token"
        title="Unique token for referencing asset type."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for asset type."
        v-model="name"
        icon="info"
      >
        <span v-if="$v.name.$invalid && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="description"
        title="Asset type description."
        label="Description"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">Description is required.</span>
      </form-text-area>
    </v-flex>
    <v-flex xs12>
      <form-select
        required
        title="Category asset type belongs to"
        :items="assetCatgories"
        v-model="assetCategory"
        label="Asset Category"
        item-text="text"
        item-value="value"
        icon="info"
      >
        <span v-if="$v.assetCategory.$invalid && $v.$dirty">Asset category is required.</span>
      </form-select>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormToken from "../common/form/FormToken.vue";
import FormText from "../common/form/FormText.vue";
import FormTextArea from "../common/form/FormTextArea.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormTextArea,
    FormSelect
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    description: {
      required
    },
    assetCategory: {
      required
    }
  }
})
export default class AssetTypeDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  description: string | null = null;
  assetCategory: string | null = null;

  assetCatgories: { text: string; value: string }[] = [
    {
      text: "Device",
      value: "Device"
    },
    {
      text: "Person",
      value: "Person"
    },
    {
      text: "Hardware",
      value: "Hardware"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.description = null;
    this.assetCategory = null;
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
    this.description = (input as any).description;
    this.assetCategory = (input as any).assetCategory;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      description: this.description,
      assetCategory: this.assetCategory
    };
  }
}
</script>
