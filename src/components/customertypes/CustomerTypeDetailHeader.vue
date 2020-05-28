<template>
  <navigation-header-panel v-if="customerType" :icon="icon" height="200px">
    <template slot="left">
      <header-branding-panel :entity="customerType" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="customerType.token" message="Token copied to clipboard" />
        </header-field>
        <header-field label="Name">
          <span>{{ customerType.name }}</span>
        </header-field>
        <header-field label="Description">
          <span>{{ customerType.description }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(customerType.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ formatDate(customerType.updatedDate) }}</span>
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
import { ICustomerType } from "sitewhere-rest-api";
import {
  NavigationHeaderPanel,
  NavigationHeaderFields,
  HeaderBrandingPanel,
  HeaderField,
  HeaderComponent,
  ClipboardCopyField
} from "sitewhere-ide-components";

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
export default class CustomerTypeDetailHeader extends HeaderComponent<
  ICustomerType
> {
  // Reference record as customer type.
  get customerType(): ICustomerType {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.customerType ? this.customerType.token : "";
  }

  get icon(): string {
    return this.customerType ? this.customerType.icon : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "customertypes/" + this.token + "/label/qrcode";
  }
}
</script>
