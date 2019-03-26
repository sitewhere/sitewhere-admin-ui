<template>
  <navigation-header-panel
    v-if="deviceType"
    :imageUrl="imageUrl"
    :qrCodeUrl="qrCodeUrl"
    height="220px"
  >
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="deviceType.token" message="Token copied to clipboard"></clipboard-copy-field>
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
    </span>
  </navigation-header-panel>
</template>

<script lang="ts">
import { HeaderComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import NavigationHeaderPanel from "../common/NavigationHeaderPanel.vue";
import ClipboardCopyField from "../common/ClipboardCopyField.vue";
import HeaderField from "../common/HeaderField.vue";
import { IDeviceType } from "sitewhere-rest-api";

export class DeviceTypeHeaderComponent extends HeaderComponent<IDeviceType> {}

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    ClipboardCopyField
  }
})
export default class DeviceDetailHeader extends Mixins(
  DeviceTypeHeaderComponent
) {
  // Reference record as device type.
  get deviceType(): IDeviceType {
    return this.record;
  }

  // Get URL for image.
  get imageUrl(): string {
    return this.deviceType ? this.deviceType.imageUrl : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "devicetypes/" + this.deviceType.token + "/label/qrcode";
  }
}
</script>

<style scoped>
</style>
