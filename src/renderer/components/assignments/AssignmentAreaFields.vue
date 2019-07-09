<template>
  <dialog-form>
    <v-flex xs12>
      <v-card flat>
        <v-checkbox label="Assign device to an area?" v-model="assign" light></v-checkbox>
        <v-divider v-if="assign" />
        <area-chooser
          v-if="assign"
          v-model="token"
          notChosenText="Choose an area below for assignment:"
          chosenText="The area below will be assigned:"
        />
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import AreaChooser from "../areas/AreaChooser.vue";

@Component({
  components: {
    DialogForm,
    AreaChooser
  }
})
export default class AssignmentAreaFields extends DialogSection {
  token: string | null = null;
  assign: boolean = false;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.assign = false;
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.token = (input as any).areaToken;
    if (this.token) {
      this.assign = true;
    }
  }

  /** Save form data to an object */
  save(): {} {
    return {
      areaToken: this.token
    };
  }
}
</script>
