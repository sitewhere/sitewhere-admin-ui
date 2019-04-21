<template>
  <sw-navigation-header-panel
    v-if="areaType"
    :icon="areaType.icon"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
    <span slot="content">
      <sw-header-field label="Token">
        <sw-clipboard-copy-field :field="areaType.token" message="Token copied to clipboard"/>
      </sw-header-field>
      <sw-header-field label="Name">
        <span>{{ areaType.name }}</span>
      </sw-header-field>
      <sw-header-field label="Description">
        <span>{{ areaType.description }}</span>
      </sw-header-field>
      <sw-header-field label="Created">
        <span>{{ formatDate(areaType.createdDate) }}</span>
      </sw-header-field>
      <sw-header-field label="Updated">
        <span>{{ formatDate(areaType.updatedDate) }}</span>
      </sw-header-field>
    </span>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";

import { formatDate } from "../common/Utils";
import { IAreaType } from "sitewhere-rest-api";

@Component({})
export default class AreaTypeDetailHeader extends HeaderComponent<IAreaType> {
  // Reference record as area type.
  get areaType(): IAreaType {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.areaType ? this.areaType.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "areatypes/" + this.token + "/label/qrcode";
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>

<style scoped>
</style>
