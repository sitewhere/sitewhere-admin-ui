<template>
  <navigation-header-panel
    v-if="customer"
    :imageUrl="customer.imageUrl"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
    <span slot="content">
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
import { ICustomer } from "sitewhere-rest-api/dist/model/customers-model";

export class CustomerHeaderComponent extends HeaderComponent<ICustomer> {}

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
  }
})
export default class CustomerDetailHeader extends Mixins(
  CustomerHeaderComponent
) {
  // Reference record as customer.
  get customer(): ICustomer {
    return this.record;
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "customers/" + this.customer.token + "/label/qrcode";
  }
}
</script>

<style scoped>
</style>
