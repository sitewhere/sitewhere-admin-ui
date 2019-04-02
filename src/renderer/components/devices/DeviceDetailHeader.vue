<template>
  <navigation-header-panel v-if="device" :imageUrl="imageUrl" :qrCodeUrl="qrCodeUrl" height="190px">
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="device.token" message="Token copied to clipboard"></clipboard-copy-field>
      </header-field>
      <linked-header-field
        label="Device Type"
        :text="device.deviceType.name"
        :url="'/devicetypes/' + device.deviceType.token"
      ></linked-header-field>
      <linked-header-field
        v-if="device.assignment.asset"
        label="Assigned Asset"
        :text="device.assignment.asset.name"
        :url="'/assets/' + device.assignment.asset.token"
      ></linked-header-field>
      <linked-header-field
        v-if="device.assignment.area"
        label="Assigned Area"
        :text="device.assignment.area.name"
        :url="'/areas/' + device.assignment.area.token"
      ></linked-header-field>
      <header-field v-else label="Assignment">
        <span>Device is not assigned</span>
      </header-field>
      <header-field label="Comments">
        <span>{{ device.comments }}</span>
      </header-field>
      <header-field label="Created">
        <span>{{ formatDate(device.createdDate) }}</span>
      </header-field>
      <header-field label="Updated">
        <span>{{ formatDate(device.updatedDate) }}</span>
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
import LinkedHeaderField from "../common/LinkedHeaderField.vue";
import { IDevice, IDeviceType } from "sitewhere-rest-api";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
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
