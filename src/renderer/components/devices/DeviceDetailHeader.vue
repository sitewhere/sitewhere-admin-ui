<template>
  <sw-navigation-header-panel v-if="device" height="190px">
    <template slot="left">
      <device-detail-header-image :device="device" />
    </template>
    <template slot="content">
      <sw-header-field label="Token">
        <clipboard-copy-field :field="device.token" message="Token copied to clipboard" />
      </sw-header-field>
      <sw-linked-header-field
        label="Device Type"
        :text="device.deviceType.name"
        :url="'/devicetypes/' + device.deviceType.token"
      />
      <sw-header-field label="Comments">
        <span>{{ device.comments }}</span>
      </sw-header-field>
      <sw-header-field label="Created">
        <span>{{ formatDate(device.createdDate) }}</span>
      </sw-header-field>
      <sw-header-field label="Updated">
        <span>{{ formatDate(device.updatedDate) }}</span>
      </sw-header-field>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl" />
    </template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";
import { IDevice, IDeviceType } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";
import DeviceDetailHeaderImage from "./DeviceDetailHeaderImage.vue";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage,
    DeviceDetailHeaderImage
  }
})
export default class DeviceDetailHeader extends HeaderComponent<IDevice> {
  // Reference record as device.
  get device(): IDevice {
    return this.record;
  }

  // Get device type.
  get deviceType(): IDeviceType {
    return this.device ? (this.device as any).deviceType : "";
  }

  // Get URL for image.
  get imageUrl(): string {
    return this.deviceType ? this.deviceType.imageUrl : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "devices/" + this.device.token + "/label/qrcode";
  }
}
</script>

<style scoped>
</style>
