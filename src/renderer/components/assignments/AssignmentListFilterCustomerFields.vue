<template>
  <dialog-form>
    <v-flex xs12>
      <v-card-text class="subheading">
        Customers selected below will be included in results.
        If no items are selected, all customers will be included.
      </v-card-text>
      <customer-multiselect v-model="customerTokens" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import CustomerMultiselect from "../customers/CustomerMultiselect.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DialogForm,
    CustomerMultiselect
  }
})
export default class AssignmentListFilterCustomerFields extends DialogSection {
  customerTokens: string[] | undefined = [];

  /** Reset section content */
  reset(): void {
    this.customerTokens = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: IDeviceAssignmentSearchCriteria): void {
    this.customerTokens = input.customerTokens;
  }

  /** Save form data to an object */
  save(): IDeviceAssignmentSearchCriteria {
    return {
      customerTokens: this.customerTokens
    };
  }
}
</script>
