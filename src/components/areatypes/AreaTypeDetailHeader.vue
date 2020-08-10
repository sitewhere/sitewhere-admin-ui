<template>
  <navigation-header-panel v-if="areaType" :icon="areaType.icon" height="200px">
    <template slot="left">
      <header-branding-panel :entity="areaType" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="areaType.token" message="Token copied to clipboard" />
        </header-field>
        <header-field label="Name">
          <span>{{ areaType.name }}</span>
        </header-field>
        <header-field label="Description">
          <span>{{ areaType.description }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(areaType.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ formatDate(areaType.updatedDate) }}</span>
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

import { formatDate } from "sitewhere-ide-common";
import { IAreaType } from "sitewhere-rest-api";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";

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
