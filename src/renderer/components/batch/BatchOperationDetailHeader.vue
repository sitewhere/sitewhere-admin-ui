<template>
  <sw-navigation-header-panel v-if="operation" height="200px">
    <template slot="left">
      <v-icon style="font-size: 110px; padding: 40px;">{{ icon }}</v-icon>
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field
            :field="operation.token"
            message="Operation token copied to clipboard"
          />
        </sw-header-field>
        <sw-header-field label="Operation type">
          <span>{{ operation.operationType }}</span>
        </sw-header-field>
        <sw-header-field label="Status">
          <span>{{ operation.processingStatus }}</span>
        </sw-header-field>
        <sw-header-field label="Created">
          <span>{{ formatDate(operation.createdDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Processing Started">
          <span>{{ formatDate(operation.processingStartedDate) }}</span>
        </sw-header-field>
        <sw-header-field label="Processing Finished">
          <span>{{ formatDate(operation.processingEndedDate) }}</span>
        </sw-header-field>
      </sw-navigation-header-fields>
    </template>
    <template slot="right"></template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";
import { IBatchOperation } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

import { NavigationIcon } from "../../libraries/constants";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage
  }
})
export default class BatchOperationDetailHeader extends HeaderComponent<
  IBatchOperation
> {
  icon: NavigationIcon = NavigationIcon.BatchOperation;

  // Reference record as device.
  get operation(): IBatchOperation {
    return this.record;
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "batch/" + this.operation.token + "/label/qrcode";
  }
}
</script>
