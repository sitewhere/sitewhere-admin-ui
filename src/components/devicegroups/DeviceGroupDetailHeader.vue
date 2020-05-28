<template>
  <navigation-header-panel v-if="deviceGroup" height="200px">
    <template slot="left">
      <header-branding-panel :entity="deviceGroup" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="deviceGroup.token" message="Token copied to clipboard" />
        </header-field>
        <header-field label="Name">
          <span>{{ deviceGroup.name }}</span>
        </header-field>
        <header-field label="Description">
          <span>{{ deviceGroup.description }}</span>
        </header-field>
        <header-field label="Image URL">
          <span>{{ deviceGroup.imageUrl }}</span>
        </header-field>
        <header-field label="Roles">
          <span>{{ rolesList }}</span>
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
import { IDeviceGroup } from "sitewhere-rest-api";
import {
  HeaderComponent,
  ClipboardCopyField,
  NavigationHeaderPanel,
  HeaderBrandingPanel,
  NavigationHeaderFields,
  HeaderField
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
export default class DeviceGroupDetailHeader extends HeaderComponent<
  IDeviceGroup
> {
  // Reference record as device group.
  get deviceGroup(): IDeviceGroup {
    return this.record;
  }

  // Get token.
  get token(): string {
    return this.deviceGroup ? this.deviceGroup.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl(): string {
    return this.deviceGroup
      ? "devicegroups/" + this.token + "/label/qrcode"
      : "";
  }

  // Get list of roles for group.
  get rolesList(): string {
    return this.deviceGroup ? this.deviceGroup.roles.join(", ") : "";
  }
}
</script>
