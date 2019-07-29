<template>
  <sw-navigation-header-panel v-if="assetType" height="190px">
    <template slot="left">
      <sw-header-branding-panel :entity="assetType" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field :field="assetType.token" message="Token copied to clipboard" />
        </sw-header-field>
        <sw-header-field label="Name">
          <span>{{ assetType.name }}</span>
        </sw-header-field>
        <sw-header-field label="Description">
          <span>{{ assetType.description }}</span>
        </sw-header-field>
        <sw-header-field label="Created">
          <span>{{ formatDate(assetType.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Updated">
          <span>{{ formatDate(assetType.updatedDate) }}</span>
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

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

import { formatDate } from "../common/Utils";
import { IAssetType } from "sitewhere-rest-api";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage
  }
})
export default class AssetTypeDetailHeader extends HeaderComponent<IAssetType> {
  // Reference record as asset type.
  get assetType(): IAssetType {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.assetType ? this.assetType.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "assettypes/" + this.token + "/label/qrcode";
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
