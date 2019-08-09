<template>
  <sw-navigation-header-panel v-if="asset" :imageUrl="imageUrl" height="200px">
    <template slot="left">
      <sw-header-branding-panel :entity="asset" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field :field="asset.token" message="Token copied to clipboard" />
        </sw-header-field>
        <sw-header-field label="Name">
          <span>{{ asset.name }}</span>
        </sw-header-field>
        <sw-linked-header-field
          label="Asset Type"
          :text="asset.assetType.name"
          :url="'/assettypes/' + asset.assetType.token"
        />
        <sw-header-field label="Image URL">
          <span>{{ asset.imageUrl }}</span>
        </sw-header-field>
        <sw-header-field label="Created">
          <span>{{ formatDate(asset.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Updated">
          <span>{{ formatDate(asset.updatedDate) }}</span>
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
import { IAsset } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage
  }
})
export default class AssetDetailHeader extends HeaderComponent<IAsset> {
  // Reference record as area.
  get asset(): IAsset {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.asset ? this.asset.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "assets/" + this.token + "/label/qrcode";
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
