<template>
  <dialog-form>
    <v-flex xs12>
      <customer-type-multiselect :value="containedCustomerTypeTokens" @input="onSelectionUpdated" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection, DialogForm } from "sitewhere-ide-components";
import { ICustomerType } from "sitewhere-rest-api";

import CustomerTypeMultiselect from "./CustomerTypeMultiselect.vue";

@Component({
  components: {
    DialogForm,
    CustomerTypeMultiselect,
  },
})
export default class CustomerTypeContentFields extends DialogSection {
  initialContainedCustomerTypes: ICustomerType[] = [];
  containedCustomerTypeTokens: string[] = [];

  /** Reset section content */
  reset(): void {
    this.initialContainedCustomerTypes = [];
    this.containedCustomerTypeTokens = [];
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
  load(input: ICustomerType): void {
    this.initialContainedCustomerTypes = input.containedCustomerTypes || [];
    this.containedCustomerTypeTokens = this.initialContainedCustomerTypes.map(
      (item) => item.token
    );
  }

  /** Save form data to an object */
  save(): {} {
    return {
      containedCustomerTypeTokens: this.containedCustomerTypeTokens,
    };
  }
}
</script>
