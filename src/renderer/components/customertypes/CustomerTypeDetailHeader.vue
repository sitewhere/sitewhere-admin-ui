<template>
  <sw-navigation-header-panel v-if="customerType" :icon="icon" height="200px">
    <template slot="left">
      <sw-header-branding-panel :entity="customerType" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field :field="customerType.token" message="Token copied to clipboard" />
        </sw-header-field>
        <sw-header-field label="Name">
          <span>{{ customerType.name }}</span>
        </sw-header-field>
        <sw-header-field label="Description">
          <span>{{ customerType.description }}</span>
        </sw-header-field>
        <sw-header-field label="Created">
          <span>{{ formatDate(customerType.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Updated">
          <span>{{ formatDate(customerType.updatedDate) }}</span>
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
import { ICustomerType } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
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
