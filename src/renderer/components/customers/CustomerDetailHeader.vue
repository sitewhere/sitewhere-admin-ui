<template>
  <navigation-header-panel
    v-if="customer"
    :imageUrl="imageUrl"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
    <template slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="customer.token" message="Token copied to clipboard"></clipboard-copy-field>
      </header-field>
      <linked-header-field
        label="Customer Type"
        :text="customer.customerType.name"
        :url="'/customertypes/' + customer.customerType.token"
      ></linked-header-field>
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
    </template>
  </navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";

import NavigationHeaderPanel from "../common/NavigationHeaderPanel.vue";
import HeaderField from "../common/HeaderField.vue";
import LinkedHeaderField from "../common/LinkedHeaderField.vue";
import ClipboardCopyField from "../common/ClipboardCopyField.vue";
import { ICustomer } from "sitewhere-rest-api";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
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
