<template>
  <sw-navigation-header-panel v-if="assignment" :imageUrl="imageUrl" height="220px">
    <template slot="left">
      <assignment-detail-header-image :assignment="assignment" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Assignment token">
          <clipboard-copy-field
            :field="assignment.token"
            message="Assignment token copied to clipboard"
          />
        </sw-header-field>
        <sw-linked-header-field
          label="Assigned device"
          :text="assignment.device.deviceType.name"
          :url="'/devices/' + assignment.device.token"
        />
        <sw-header-field label="Created date">
          <span>{{ formatDate(assignment.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Last updated date">
          <span>{{ formatDate(assignment.updatedDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Active date">
          <span>{{ formatDate(assignment.activeDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Released date">
          <span>{{ formatDate(assignment.releasedDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Status">
          <assignment-status-button :assignment="assignment" @updated="onStatusUpdated" />
        </sw-header-field>
      </sw-navigation-header-fields>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl" />
    </template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";

import { formatDate } from "../common/Utils";
import { IDeviceAssignment } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";
import AssignmentDetailHeaderImage from "./AssignmentDetailHeaderImage.vue";
import AssignmentStatusButton from "./AssignmentStatusButton.vue";

@Component({
  components: {
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
