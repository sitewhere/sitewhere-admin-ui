<template>
  <sw-navigation-header-panel
    v-if="customerType"
    :icon="icon"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
    <template slot="content">
      <sw-header-field label="Token">
        <sw-clipboard-copy-field :field="customerType.token" message="Token copied to clipboard"/>
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
    </template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";
import { ICustomerType } from "sitewhere-rest-api";

@Component({})
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

<style scoped>
</style>
