<template>
  <navigation-header-panel v-if="assetType" height="190px">
    <template slot="left">
      <header-branding-panel :entity="assetType" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="assetType.token" message="Token copied to clipboard" />
        </header-field>
        <header-field label="Name">
          <span>{{ assetType.name }}</span>
        </header-field>
        <header-field label="Description">
          <span>{{ assetType.description }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(assetType.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ formatDate(assetType.updatedDate) }}</span>
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
  HeaderField
} from "sitewhere-ide-components";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";

import { formatDate } from "sitewhere-ide-common";
import { IAssetType } from "sitewhere-rest-api";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderBrandingPanel,
    NavigationHeaderFields,
    HeaderField,
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
