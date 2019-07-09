<template>
  <dialog-form>
    <v-flex xs12>
      <v-card flat>
        <v-checkbox label="Assign device to a customer?" v-model="assign" light></v-checkbox>
        <v-divider v-if="assign" />
        <customer-chooser
          v-if="assign"
          v-model="token"
          notChosenText="Choose a customer below for assignment:"
          chosenText="The customer below will be assigned:"
        />
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import CustomerChooser from "../customers/CustomerChooser.vue";

@Component({
  components: {
    DialogForm,
    CustomerChooser
  }
})
export default class AssignmentCustomerFields extends DialogSection {
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
    this.token = (input as any).customerToken;
    if (this.token) {
      this.assign = true;
    }
  }

  /** Save form data to an object */
  save(): {} {
    return {
      customerToken: this.token
    };
  }
}
</script>
