<template>
  <sw-dialog-form>
    <v-flex xs12>
      <v-card-text class="subheading">
        Device types selected below will be included in results.
        If no items are selected, all device types will be included.
      </v-card-text>
      <device-type-multiselect v-model="deviceTypeTokens" />
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import DeviceTypeMultiselect from "../devicetypes/DeviceTypeMultiselect.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceTypeMultiselect
  }
})
export default class AssignmentListFilterDeviceTypeFields extends DialogSection {
  deviceTypeTokens: string[] | undefined = [];

  /** Reset section content */
  reset(): void {
    this.deviceTypeTokens = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: IDeviceAssignmentSearchCriteria): void {
    this.deviceTypeTokens = input.deviceTypeTokens;
  }

  /** Save form data to an object */
  save(): IDeviceAssignmentSearchCriteria {
    return {
      deviceTypeTokens: this.deviceTypeTokens
    };
  }
}
</script>
