<template>
  <dialog-form>
    <v-flex xs12>
      <area-type-multiselect :value="containedAreaTypeTokens" @input="onSelectionUpdated" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection, DialogForm } from "sitewhere-ide-components";
import { IAreaType } from "sitewhere-rest-api";

import AreaTypeMultiselect from "./AreaTypeMultiselect.vue";

@Component({
  components: {
    DialogForm,
    AreaTypeMultiselect,
  },
})
export default class AreaTypeContentFields extends DialogSection {
  initialContainedAreaTypes: IAreaType[] = [];
  containedAreaTypeTokens: string[] = [];

  /** Reset section content */
  reset(): void {
    this.initialContainedAreaTypes = [];
    this.containedAreaTypeTokens = [];
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
  load(input: IAreaType): void {
    this.initialContainedAreaTypes = input.containedAreaTypes || [];
    this.containedAreaTypeTokens = this.initialContainedAreaTypes.map(
      (item) => item.token
    );
  }

  /** Save form data to an object */
  save(): {} {
    return {
      containedAreaTypeTokens: this.containedAreaTypeTokens,
    };
  }
}
</script>
