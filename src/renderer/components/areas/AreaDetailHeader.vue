<template>
  <sw-navigation-header-panel v-if="area" height="200px">
    <template slot="left">
      <sw-header-branding-panel :entity="area" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field :field="area.token" message="Token copied to clipboard" />
        </sw-header-field>
        <sw-linked-header-field
          label="Area Type"
          :text="area.areaType.name"
          :url="'/areatypes/' + area.areaType.token"
        />
        <sw-header-field label="Name">
          <span>{{ area.name }}</span>
        </sw-header-field>
        <sw-header-field label="Description">
          <span>{{ area.description }}</span>
        </sw-header-field>
        <sw-header-field label="Created">
          <span>{{ formatDate(area.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Updated">
          <span>{{ formatDate(area.updatedDate) }}</span>
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

import { formatDate } from "../common/Utils";
import { IArea } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage
  }
})
export default class AreaDetailHeader extends HeaderComponent<IArea> {
  // Reference record as area.
  get area(): IArea {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.area ? this.area.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "areas/" + this.token + "/label/qrcode";
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
