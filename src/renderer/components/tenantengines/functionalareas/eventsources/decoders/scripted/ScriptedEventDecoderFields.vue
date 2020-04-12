<template>
  <dialog-form>
    <v-flex xs8>
      <script-chooser
        ref="chooser"
        label="Event Decoder Script"
        title="Script used to decode event payloads."
        :tenantId="tenantId"
        functionalArea="event-sources"
        category="event-sources-event-decoder-category"
        v-model="scriptId"
        icon="fa-code"
        class="mr-3"
      >
        <span v-if="!$v.scriptId.required && $v.$dirty"
          >Event decoder script is required.</span
        >
      </script-chooser>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop, DialogSection, Refs } from "sitewhere-ide-common";
import { IScriptedEventDecoderConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../../../common/form/DialogForm.vue";
import ScriptChooser from "../../../../../common/form/ScriptChooser.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    ScriptChooser,
  },
  validations: {
    scriptId: {
      required,
    },
  },
})
export default class ScriptedDecoderFields extends DialogSection {
  @Prop() readonly tenantId!: string;

  scriptId: string | null = null;

  // References.
  $refs!: Refs<{
    chooser: ScriptChooser;
  }>;

  /** Reset section content */
  reset(): void {
    if (this.$refs.chooser) {
      this.$refs.chooser.reset();
    }
    this.scriptId = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IScriptedEventDecoderConfiguration): void {
    this.scriptId = input.scriptId || null;
  }

  /** Save form data to an object */
  save(): IScriptedEventDecoderConfiguration {
    return {
      scriptId: this.scriptId || "",
    };
  }
}
</script>
