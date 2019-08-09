<template>
  <dialog-form>
    <v-flex xs12>
      <area-type-multiselect
        :idMode="true"
        :value="containedAreaTypeIds"
        @input="onSelectionUpdated"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import AreaTypeMultiselect from "./AreaTypeMultiselect.vue";

@Component({
  components: {
    DialogForm,
    AreaTypeMultiselect
  }
})
export default class AreaTypeContentFields extends DialogSection {
  containedAreaTypeIds: string[] = [];
  containedAreaTypeTokens: string[] = [];

  /** Reset section content */
  reset(): void {
    this.containedAreaTypeIds = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Capture tokens for selected area types */
  onSelectionUpdated(tokens: string[]) {
    this.containedAreaTypeTokens = tokens;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.containedAreaTypeIds = (input as any).containedAreaTypeIds;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      containedAreaTypeTokens: this.containedAreaTypeTokens
    };
  }
}
</script>
