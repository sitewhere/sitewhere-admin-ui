<template>
  <sw-navigation-header-panel v-if="customer" :imageUrl="imageUrl" height="200px">
    <template slot="content">
      <sw-header-field label="Token">
        <sw-clipboard-copy-field :field="customer.token" message="Token copied to clipboard"/>
      </sw-header-field>
      <sw-linked-header-field
        label="Customer Type"
        :text="customer.customerType.name"
        :url="'/customertypes/' + customer.customerType.token"
      />
      <sw-header-field label="Name">
        <span>{{ customer.name }}</span>
      </sw-header-field>
      <sw-header-field label="Description">
        <span>{{ customer.description }}</span>
      </sw-header-field>
      <sw-header-field label="Created">
        <span>{{ formatDate(customer.createdDate) }}</span>
      </sw-header-field>
      <sw-header-field label="Updated">
        <span>{{ formatDate(customer.updatedDate) }}</span>
      </sw-header-field>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl"/>
    </template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";
import { ICustomer } from "sitewhere-rest-api";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
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
