<template>
  <navigation-header-panel v-if="area" height="200px">
    <template slot="left">
      <header-branding-panel :entity="area" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="area.token" message="Token copied to clipboard" />
        </header-field>
        <linked-header-field
          label="Area Type"
          :text="area.areaType.name"
          :url="'/areatypes/' + area.areaType.token"
        />
        <header-field label="Name">
          <span>{{ area.name }}</span>
        </header-field>
        <header-field label="Description">
          <span>{{ area.description }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(area.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ formatDate(area.updatedDate) }}</span>
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
  NavigationHeaderFields,
  HeaderBrandingPanel,
  HeaderField,
  LinkedHeaderField
} from "sitewhere-ide-components";

import { formatDate } from "sitewhere-ide-common";
import { IArea } from "sitewhere-rest-api";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    NavigationHeaderPanel,
    NavigationHeaderFields,
    HeaderBrandingPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField,
    AuthenticatedImage
  }
})
export default class AreaDetailHeader extends HeaderComponent<IArea> {
  // Reference record as area.
  get area(): IArea {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.area ? this.area.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "areas/" + this.token + "/label/qrcode";
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
