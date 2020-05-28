<template>
  <dialog-form>
    <v-flex xs12>
      <customer-type-multiselect
        :idMode="true"
        :value="containedCustomerTypeIds"
        @input="onSelectionUpdated"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection, DialogForm } from "sitewhere-ide-components";

import CustomerTypeMultiselect from "./CustomerTypeMultiselect.vue";

@Component({
  components: {
    DialogForm,
    CustomerTypeMultiselect
  }
})
export default class CustomerTypeContentFields extends DialogSection {
  containedCustomerTypeIds: string[] = [];
  containedCustomerTypeTokens: string[] = [];

  /** Reset section content */
  reset(): void {
    this.containedCustomerTypeIds = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Capture tokens for selected device types */
  onSelectionUpdated(tokens: string[]) {
    this.containedCustomerTypeTokens = tokens;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.containedCustomerTypeIds = (input as any).containedCustomerTypeIds;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      containedCustomerTypeTokens: this.containedCustomerTypeTokens
    };
  }
}
</script>
