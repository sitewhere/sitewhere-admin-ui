<template>
  <navigation-header-panel v-if="asset" :imageUrl="imageUrl" :qrCodeUrl="qrCodeUrl" height="200px">
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="asset.token" message="Token copied to clipboard"></clipboard-copy-field>
      </header-field>
      <header-field label="Name">
        <span>{{ asset.name }}</span>
      </header-field>
      <linked-header-field
        label="Asset Type"
        :text="asset.assetType.name"
        :url="'/assettypes/' + asset.assetType.token"
      ></linked-header-field>
      <header-field label="Image URL">
        <span>{{ asset.imageUrl }}</span>
      </header-field>
      <header-field label="Created">
        <span>{{ formatDate(asset.createdDate) }}</span>
      </header-field>
      <header-field label="Updated">
        <span>{{ formatDate(asset.updatedDate) }}</span>
      </header-field>
    </span>
  </navigation-header-panel>
</template>

<script lang="ts">
import { HeaderComponent } from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import NavigationHeaderPanel from "../common/NavigationHeaderPanel.vue";
import HeaderField from "../common/HeaderField.vue";
import LinkedHeaderField from "../common/LinkedHeaderField.vue";
import ClipboardCopyField from "../common/ClipboardCopyField.vue";

import { formatDate } from "../common/Utils";
import { IAsset } from "sitewhere-rest-api";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
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

  // Get URL for image.
  get imageUrl(): string {
    return this.asset ? this.asset.imageUrl : "";
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

<style scoped>
</style>
