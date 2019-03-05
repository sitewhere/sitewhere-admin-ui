<template>
  <navigation-header-panel
    v-if="customerType"
    :icon="customerType.icon"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="customerType.token" message="Token copied to clipboard"></clipboard-copy-field>
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
    </span>
  </navigation-header-panel>
</template>

<script>
import NavigationHeaderPanel from "../common/NavigationHeaderPanel";
import HeaderField from "../common/HeaderField";
import ClipboardCopyField from "../common/ClipboardCopyField";

import { formatDate } from "../common/Utils";

export default {
  data: () => ({}),

  props: ["customerType", "customerTypes"],

  components: {
    NavigationHeaderPanel,
    HeaderField,
    ClipboardCopyField
  },

  computed: {
    // Compute QR code URL.
    qrCodeUrl: function() {
      return "customertypes/" + this.customerType.token + "/label/qrcode";
    }
  }
};
</script>

<style scoped>
</style>
