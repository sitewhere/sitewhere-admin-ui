<template>
  <navigation-header-panel v-if="customerType" :icon="icon" :qrCodeUrl="qrCodeUrl" height="200px">
    <template slot="content">
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
    </template>
  </navigation-header-panel>
</template>

<script lang="ts">
import { HeaderComponent } from "../../libraries/component-model";
import { Component, Mixins } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import NavigationHeaderPanel from "../common/NavigationHeaderPanel.vue";
import HeaderField from "../common/HeaderField.vue";
import ClipboardCopyField from "../common/ClipboardCopyField.vue";
import { ICustomerType } from "sitewhere-rest-api";

export class CustomerTypeHeaderComponent extends HeaderComponent<
  ICustomerType
> {}

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    ClipboardCopyField
  }
})
export default class CustomerTypeDetailHeader extends Mixins(
  CustomerTypeHeaderComponent
) {
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
