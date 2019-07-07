<template>
  <sw-navigation-header-panel v-if="deviceGroup" :imageUrl="imageUrl" height="200px">
    <template slot="content">
      <sw-header-field label="Token">
        <sw-clipboard-copy-field :field="deviceGroup.token" message="Token copied to clipboard"/>
      </sw-header-field>
      <sw-header-field label="Name">
        <span>{{ deviceGroup.name }}</span>
      </sw-header-field>
      <sw-header-field label="Description">
        <span>{{ deviceGroup.description }}</span>
      </sw-header-field>
      <sw-header-field label="Image URL">
        <span>{{ deviceGroup.imageUrl }}</span>
      </sw-header-field>
      <sw-header-field label="Roles">
        <span>{{ rolesList }}</span>
      </sw-header-field>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl"/>
    </template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";
import { IDeviceGroup } from "sitewhere-rest-api";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    AuthenticatedImage
  }
})
export default class DeviceGroupDetailHeader extends HeaderComponent<IDeviceGroup> {
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
