<template>
  <sw-dialog-form>
    <v-flex xs12>
      <v-card-text class="subheading">
        Assets selected below will be included in results.
        If no items are selected, all assets will be included.
      </v-card-text>
      <asset-multiselect v-model="assetTokens" />
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import AssetMultiselect from "../assets/AssetMultiselect.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    AssetMultiselect
  }
})
export default class AssignmentListFilterAssetFields extends DialogSection {
  assetTokens: string[] | undefined = [];

  /** Reset section content */
  reset(): void {
    this.assetTokens = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: IDeviceAssignmentSearchCriteria): void {
    this.assetTokens = input.assetTokens;
  }

  /** Save form data to an object */
  save(): IDeviceAssignmentSearchCriteria {
    return {
      assetTokens: this.assetTokens
    };
  }
}
</script>
