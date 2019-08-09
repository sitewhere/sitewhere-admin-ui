<template>
  <sw-navigation-header-panel v-if="deviceType" height="220px">
    <template slot="left">
      <sw-header-branding-panel :entity="deviceType" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field :field="deviceType.token" message="Token copied to clipboard" />
        </sw-header-field>
        <sw-header-field label="Name">
          <span>{{ deviceType.name }}</span>
        </sw-header-field>
        <sw-header-field label="Description">
          <span>{{ deviceType.description }}</span>
        </sw-header-field>
        <sw-header-field label="Image URL">
          <span>{{ deviceType.imageUrl }}</span>
        </sw-header-field>
        <sw-header-field label="Container Policy">
          <span>{{ deviceType.containerPolicy }}</span>
        </sw-header-field>
        <sw-header-field label="Created">
          <span>{{ formatDate(deviceType.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Updated">
          <span>{{ formatDate(deviceType.updatedDate) }}</span>
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
import { IDeviceType } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage
  }
})
export default class DeviceTypeDetailHeader extends HeaderComponent<
  IDeviceType
> {
  // Reference record as device type.
  get deviceType(): IDeviceType {
    return this.record;
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "devicetypes/" + this.deviceType.token + "/label/qrcode";
  }
}
</script>

<style scoped>
</style>
