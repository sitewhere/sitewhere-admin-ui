<template>
  <dialog-form>
    <v-flex xs12>
      <device-type-chooser
        v-model="token"
        notChosenText="Choose device type for filter:"
        chosenText="Filter will include type chosen below:"
      />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection, DialogForm } from "sitewhere-ide-components";

import DeviceTypeChooser from "../devicetypes/DeviceTypeChooser.vue";

@Component({
  components: {
    DialogForm,
    DeviceTypeChooser
  }
})
export default class DeviceListFilterDeviceTypeFields extends DialogSection {
  token: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.token = (input as any).deviceTypeToken;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      deviceTypeToken: this.token
    };
  }
}
</script>
