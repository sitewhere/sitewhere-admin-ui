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

<script>
import NavigationHeaderPanel from "../common/NavigationHeaderPanel";
import HeaderField from "../common/HeaderField";
import LinkedHeaderField from "../common/LinkedHeaderField";
import ClipboardCopyField from "../common/ClipboardCopyField";

import { formatDate } from "../common/Utils";

export default {
  data: () => ({}),

  props: ["customer"],

  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
  },

  computed: {
    // Compute QR code URL.
    qrCodeUrl: function() {
      return "customers/" + this.customer.token + "/label/qrcode";
    }
  }
};
</script>

<style scoped>
</style>
