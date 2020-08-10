<template>
  <v-btn :disabled="true" icon small>
    <v-avatar size="40">
      <img :src="imageUrl" />
    </v-avatar>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { IDeviceAssignmentSummary } from "sitewhere-rest-api";

@Component({
  components: {}
})
export default class AssignmentAvatar extends Vue {
  @Prop() readonly assignment!: IDeviceAssignmentSummary;

  /** Choose which image URL to return */
  get imageUrl(): string | null {
    if (this.assignment.assetImageUrl) {
      return this.assignment.assetImageUrl;
    } else if (this.assignment.customerImageUrl) {
      return this.assignment.customerImageUrl;
    } else if (this.assignment.areaImageUrl) {
      return this.assignment.areaImageUrl;
    } else {
      return null;
    }
  }
}
</script>
