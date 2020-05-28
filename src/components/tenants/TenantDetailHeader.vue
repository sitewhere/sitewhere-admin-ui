<template>
  <navigation-header-panel v-if="tenant" height="130px">
    <template slot="left">
      <header-branding-panel :entity="tenant" />
    </template>
    <template slot="content">
      <navigation-header-fields class="mt-3">
        <header-field label="Token">
          <clipboard-copy-field :field="tenant.token" message="Token copied to clipboard" />
        </header-field>
        <header-field label="Name">
          <span>{{ tenant.name }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ format(tenant.createdDate) }}</span>
        </header-field>
        <header-field label="Updated">
          <span>{{ format(tenant.updatedDate) }}</span>
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
import { ITenant } from "sitewhere-rest-api";
import { formatDate } from "sitewhere-ide-common";
import {
  HeaderComponent,
  NavigationHeaderPanel,
  NavigationHeaderFields,
  HeaderBrandingPanel,
  HeaderField,
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
export default class TenantDetailHeader extends HeaderComponent<ITenant> {
  /** Reference record as tenant */
  get tenant(): ITenant {
    return this.record;
  }

  /** Get token */
  get token(): string {
    return this.tenant ? this.tenant.token : "";
  }

  /** Get URL for QR code */
  get qrCodeUrl(): string {
    return this.tenant ? "tenants/" + this.token + "/label/qrcode" : "";
  }

  /** Format a date */
  format(date: Date): string {
    return formatDate(date);
  }
}
</script>
