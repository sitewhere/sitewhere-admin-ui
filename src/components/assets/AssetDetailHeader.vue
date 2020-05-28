<template>
  <navigation-header-panel v-if="asset" :imageUrl="imageUrl" height="200px">
    <template slot="left">
      <header-branding-panel :entity="asset" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="asset.token" message="Token copied to clipboard" />
        </header-field>
        <header-field label="Name">
          <span>{{ asset.name }}</span>
        </header-field>
        <linked-header-field
          label="Asset Type"
          :text="asset.assetType.name"
          :url="'/assettypes/' + asset.assetType.token"
        />
        <header-field label="Image URL">
          <span>{{ asset.imageUrl }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(asset.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ formatDate(asset.updatedDate) }}</span>
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
import {
  HeaderComponent,
  ClipboardCopyField,
  NavigationHeaderPanel,
  HeaderBrandingPanel,
  NavigationHeaderFields,
  HeaderField,
  LinkedHeaderField
} from "sitewhere-ide-components";

import { formatDate } from "sitewhere-ide-common";
import { IAsset } from "sitewhere-rest-api";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderBrandingPanel,
    NavigationHeaderFields,
    HeaderField,
    LinkedHeaderField,
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
