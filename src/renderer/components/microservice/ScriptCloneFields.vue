<template>
  <sw-dialog-form>
    <v-flex xs12>
      <sw-form-text
        required
        label="Comment"
        title="Comment for new version."
        v-model="comment"
        icon="info"
      >
        <span v-if="!$v.comment.required && $v.$dirty">Id is required.</span>
      </sw-form-text>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    comment: {
      required
    }
  }
})
export default class ScriptCloneFields extends DialogSection {
  comment: string | null = null;

  /** Reset section content */
  reset(): void {
    this.comment = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.comment = (input as any).comment;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      comment: this.comment
    };
  }
}
</script>

<style scoped>
</style>
