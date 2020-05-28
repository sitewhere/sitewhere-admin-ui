<template>
  <navigation-header-panel v-if="deviceType" height="220px">
    <template slot="left">
      <header-branding-panel :entity="deviceType" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="deviceType.token" message="Token copied to clipboard" />
        </header-field>
        <header-field label="Name">
          <span>{{ deviceType.name }}</span>
        </header-field>
        <header-field label="Description">
          <span>{{ deviceType.description }}</span>
        </header-field>
        <header-field label="Image URL">
          <span>{{ deviceType.imageUrl }}</span>
        </header-field>
        <header-field label="Container Policy">
          <span>{{ deviceType.containerPolicy }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(deviceType.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ formatDate(deviceType.updatedDate) }}</span>
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
import { IDeviceType } from "sitewhere-rest-api";
import {
  NavigationHeaderPanel,
  HeaderBrandingPanel,
  NavigationHeaderFields,
  HeaderComponent,
  HeaderField,
  ClipboardCopyField
} from "sitewhere-ide-components";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderBrandingPanel,
    NavigationHeaderFields,
    HeaderField,
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
