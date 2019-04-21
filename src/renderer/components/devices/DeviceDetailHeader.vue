<template>
  <sw-navigation-header-panel
    v-if="device"
    :imageUrl="imageUrl"
    :qrCodeUrl="qrCodeUrl"
    height="190px"
  >
    <span slot="content">
      <sw-header-field label="Token">
        <clipboard-copy-field :field="device.token" message="Token copied to clipboard"></clipboard-copy-field>
      </sw-header-field>
      <sw-linked-header-field
        label="Device Type"
        :text="device.deviceType.name"
        :url="'/devicetypes/' + device.deviceType.token"
      />
      <sw-linked-header-field
        v-if="device.assignment.asset"
        label="Assigned Asset"
        :text="device.assignment.asset.name"
        :url="'/assets/' + device.assignment.asset.token"
      />
      <sw-linked-header-field
        v-if="device.assignment.area"
        label="Assigned Area"
        :text="device.assignment.area.name"
        :url="'/areas/' + device.assignment.area.token"
      />
      <sw-header-field v-else label="Assignment">
        <span>Device is not assigned</span>
      </sw-header-field>
      <sw-header-field label="Comments">
        <span>{{ device.comments }}</span>
      </sw-header-field>
      <sw-header-field label="Created">
        <span>{{ formatDate(device.createdDate) }}</span>
      </sw-header-field>
      <sw-header-field label="Updated">
        <span>{{ formatDate(device.updatedDate) }}</span>
      </sw-header-field>
    </span>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";
import { IDevice, IDeviceType } from "sitewhere-rest-api";

@Component({})
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
