<template>
  <navigation-header-panel
    v-if="deviceGroup"
    :imageUrl="imageUrl"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="deviceGroup.token" message="Token copied to clipboard"></clipboard-copy-field>
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
    </span>
  </navigation-header-panel>
</template>

<script lang="ts">
import { HeaderComponent } from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import NavigationHeaderPanel from "../common/NavigationHeaderPanel.vue";
import ClipboardCopyField from "../common/ClipboardCopyField.vue";
import HeaderField from "../common/HeaderField.vue";
import { IDeviceGroup } from "sitewhere-rest-api";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    ClipboardCopyField
  }
})
export default class DeviceDetailHeader extends HeaderComponent<IDeviceGroup> {
  // Reference record as device group.
  get deviceGroup(): IDeviceGroup {
    return this.record;
  }

  // Get token.
  get token(): string {
    return this.deviceGroup ? this.deviceGroup.token : "";
  }

  // Get URL for image.
  get imageUrl(): string {
    return this.deviceGroup ? this.deviceGroup.imageUrl : "";
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

<style scoped>
</style>
