<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Asset token"
        title="Unique token for referencing asset."
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
      <asset-type-selector v-model="assetTypeToken" title="Type of asset being created.">
        <span v-if="$v.assetTypeToken.$invalid && $v.$dirty">Asset type is required.</span>
      </asset-type-selector>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormToken from "../common/form/FormToken.vue";
import FormText from "../common/form/FormText.vue";
import AssetTypeSelector from "../assettypes/AssetTypeSelector.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    AssetTypeSelector
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    assetTypeToken: {
      required
    }
  }
})
export default class AssetDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  assetTypeToken: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.assetTypeToken = null;
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
    this.assetTypeToken = (input as any).assetType.token;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      assetTypeToken: this.assetTypeToken
    };
  }
}
</script>
