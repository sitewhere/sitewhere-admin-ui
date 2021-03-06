<template>
  <list-entry style="min-height: 130px">
    <v-container @click="onOpenDevice">
      <v-layout row>
        <v-flex xs3>
          <branding-image
            :style="logoStyle"
            :entityImageUrl="device.deviceTypeImageUrl"
            iconSize="4x"
          />
        </v-flex>
        <v-flex xs8>
          <div>
            <div class="title ellipsis mb-2">{{ device.deviceTypeName }}</div>
            <div class="subtitle-2 mb-2">{{ device.token }}</div>
            <div class="caption dvcomm">{{ device.comments }}</div>
          </div>
        </v-flex>
        <v-flex xs1>
          <div>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  dark
                  icon
                  class="blue pa-0 ma-0"
                  @click.stop="onAssignDevice"
                  slot="activator"
                >
                  <v-icon small>fa-link</v-icon>
                </v-btn>
              </template>
              <span>Create New Assignment</span>
            </v-tooltip>
          </div>
          <div v-if="hasAssignments">
            <v-btn :disabled="true" icon small class="mt-3 ml-1">
              <assignment-avatar :assignment="firstAssignment" />
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { ListEntry } from "sitewhere-ide-components";

import BrandingImage from "../common/BrandingImage.vue";
import AssignmentAvatar from "./AssignmentAvatar.vue";

import { IStyle } from "../common/Style";
import { IDeviceSummary, IDeviceAssignmentSummary } from "sitewhere-rest-api";

@Component({
  components: { ListEntry, BrandingImage, AssignmentAvatar },
})
export default class DeviceListEntry extends Vue {
  @Prop() readonly device!: IDeviceSummary;

  get assignments(): IDeviceAssignmentSummary[] {
    return this.device.deviceAssignmentSummaries;
  }

  get hasAssignments() {
    return this.assignments && this.assignments.length > 0;
  }

  get firstAssignment(): IDeviceAssignmentSummary | null {
    return this.hasAssignments ? this.assignments[0] : null;
  }

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "110px",
      width: "110px",
    };
  }

  // Called when a device is clicked.
  onOpenDevice() {
    this.$emit("open", this.device);
  }

  // Open device assignment dialog.
  onAssignDevice() {
    this.$emit("assign", this.device);
  }
}
</script>

<style scoped>
.dvcomm {
  height: 25px;
  overflow-y: hidden;
}
</style>
