<template>
  <navigation-header-panel v-if="customer" height="200px">
    <template slot="left">
      <header-branding-panel :entity="customer" />
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field :field="customer.token" message="Token copied to clipboard" />
        </header-field>
        <linked-header-field
          label="Customer Type"
          :text="customer.customerType.name"
          :url="'/customertypes/' + customer.customerType.token"
        />
        <header-field label="Name">
          <span>{{ customer.name }}</span>
        </header-field>
        <header-field label="Description">
          <span>{{ customer.description }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(customer.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ formatDate(customer.updatedDate) }}</span>
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
import { ICustomer } from "sitewhere-rest-api";
import {
  HeaderComponent,
  ClipboardCopyField,
  NavigationHeaderPanel,
  HeaderBrandingPanel,
  NavigationHeaderFields,
  HeaderField,
  LinkedHeaderField
} from "sitewhere-ide-components";

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
export default class CustomerDetailHeader extends HeaderComponent<ICustomer> {
  // Reference record as customer.
  get customer(): ICustomer {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.customer ? this.customer.token : "";
  }

  // Get URL for image.
  get imageUrl(): string {
    return this.customer ? this.customer.imageUrl : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "customers/" + this.token + "/label/qrcode";
  }
}
</script>

<style scoped>
</style>
