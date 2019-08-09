<template>
  <sw-navigation-header-panel v-if="tenant" height="150px">
    <template slot="left">
      <sw-header-branding-panel :entity="tenant" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields class="mt-3">
        <sw-header-field label="Token">
          <clipboard-copy-field :field="tenant.token" message="Token copied to clipboard" />
        </sw-header-field>
        <sw-header-field label="Name">
          <span>{{ tenant.name }}</span>
        </sw-header-field>
        <sw-header-field label="Created">
          <span>{{ formatDate(tenant.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Updated">
          <span>{{ formatDate(tenant.updatedDate) }}</span>
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
import { ITenant } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
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

  // Get URL for QR code.
  get qrCodeUrl(): string {
    return this.tenant ? "tenants/" + this.token + "/label/qrcode" : "";
  }
}
</script>
