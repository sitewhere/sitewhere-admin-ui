<template>
  <navigation-header-panel
    v-if="assetType"
    :imageUrl="assetType.imageUrl"
    :qrCodeUrl="qrCodeUrl"
    height="190px"
  >
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="assetType.token" message="Token copied to clipboard"></clipboard-copy-field>
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
    </span>
  </navigation-header-panel>
</template>

<script lang="ts">
import { HeaderComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import NavigationHeaderPanel from "../common/NavigationHeaderPanel.vue";
import HeaderField from "../common/HeaderField.vue";
import LinkedHeaderField from "../common/LinkedHeaderField.vue";
import ClipboardCopyField from "../common/ClipboardCopyField.vue";

import { formatDate } from "../common/Utils";
import { IAssetType } from "sitewhere-rest-api";

export class AssetTypeHeaderComponent extends HeaderComponent<IAssetType> {}

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
  }
})
export default class AreaTypeDetailHeader extends Mixins(
  AssetTypeHeaderComponent
) {
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

<style scoped>
</style>
