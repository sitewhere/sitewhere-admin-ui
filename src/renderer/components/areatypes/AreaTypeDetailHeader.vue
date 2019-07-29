<template>
  <sw-navigation-header-panel v-if="areaType" :icon="areaType.icon" height="200px">
    <template slot="left">
      <sw-header-branding-panel :entity="areaType" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field :field="areaType.token" message="Token copied to clipboard" />
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
      </sw-navigation-header-fields>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl" />
    </template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";

import { formatDate } from "../common/Utils";
import { IAreaType } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage
  }
})
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
