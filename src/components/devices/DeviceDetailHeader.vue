<template>
  <navigation-header-panel v-if="device">
    <template slot="left">
      <device-detail-header-image :device="device" />
    </template>
    <template slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="device.token" message="Token copied to clipboard" />
      </header-field>
      <linked-header-field
        label="Device Type"
        :text="device.deviceType.name"
        :url="'/devicetypes/' + device.deviceType.token"
      />
      <header-field label="Comments">
        <span>{{ device.comments }}</span>
      </header-field>
      <header-field label="Created">
        <span>{{ formatDate(device.createdDate) }}</span>
      </header-field>
      <header-field label="Updated">
        <span>{{ formatDate(device.updatedDate) }}</span>
      </header-field>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl" />
    </template>
  </navigation-header-panel>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { IDevice, IDeviceType } from "sitewhere-rest-api";
import {
  HeaderComponent,
  ClipboardCopyField,
  NavigationHeaderPanel,
  HeaderField,
  LinkedHeaderField
} from "sitewhere-ide-components";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";
import DeviceDetailHeaderImage from "./DeviceDetailHeaderImage.vue";

@Component({
  components: {
    NavigationHeaderPanel,
    ClipboardCopyField,
    AuthenticatedImage,
    DeviceDetailHeaderImage,
    HeaderField,
    LinkedHeaderField
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
