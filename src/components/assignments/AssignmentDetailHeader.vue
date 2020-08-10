<template>
  <navigation-header-panel v-if="assignment" :imageUrl="imageUrl" height="220px">
    <template slot="left">
      <assignment-detail-header-image :assignment="assignment" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Assignment token">
          <clipboard-copy-field
            :field="assignment.token"
            message="Assignment token copied to clipboard"
          />
        </header-field>
        <linked-header-field
          label="Assigned device"
          :text="assignment.device.deviceType.name"
          :url="'/devices/' + assignment.device.token"
        />
        <header-field label="Created date">
          <span>{{ formatDate(assignment.createdDate) }}</span>
        </header-field>
        <header-field label="Last updated date">
          <span>{{ formatDate(assignment.updatedDate) }}</span>
        </header-field>
        <header-field label="Active date">
          <span>{{ formatDate(assignment.activeDate) }}</span>
        </header-field>
        <header-field label="Released date">
          <span>{{ formatDate(assignment.releasedDate) }}</span>
        </header-field>
        <header-field label="Status">
          <assignment-status-button :assignment="assignment" @updated="onStatusUpdated" />
        </header-field>
      </navigation-header-fields>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl" />
    </template>
  </navigation-header-panel>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import {
  HeaderComponent,
  ClipboardCopyField,
  NavigationHeaderPanel,
  NavigationHeaderFields,
  HeaderField,
  LinkedHeaderField
} from "sitewhere-ide-components";

import { formatDate } from "sitewhere-ide-common";
import { IDeviceAssignment } from "sitewhere-rest-api";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";
import AssignmentDetailHeaderImage from "./AssignmentDetailHeaderImage.vue";
import AssignmentStatusButton from "./AssignmentStatusButton.vue";

@Component({
  components: {
    NavigationHeaderPanel,
    NavigationHeaderFields,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField,
    AuthenticatedImage,
    AssignmentDetailHeaderImage,
    AssignmentStatusButton
  }
})
export default class AssignmentDetailHeader extends HeaderComponent<
  IDeviceAssignment
> {
  // Reference record as assignment.
  get assignment(): IDeviceAssignment {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.assignment ? this.assignment.token : "";
  }

  // Get URL for image.
  get imageUrl(): string {
    return this.assignment
      ? (this.assignment as any).device.deviceType.imageUrl
      : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "assignments/" + this.token + "/label/qrcode";
  }

  /** Signal that status was updated */
  onStatusUpdated() {
    this.$emit("statusUpdated");
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
