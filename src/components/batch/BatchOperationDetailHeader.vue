<template>
  <navigation-header-panel v-if="operation" height="200px">
    <template slot="left">
      <v-icon style="font-size: 110px; padding: 40px;">{{ icon }}</v-icon>
    </template>
    <template slot="content">
      <navigation-header-fields>
        <header-field label="Token">
          <clipboard-copy-field
            :field="operation.token"
            message="Operation token copied to clipboard"
          />
        </header-field>
        <header-field label="Operation type">
          <span>{{ operation.operationType }}</span>
        </header-field>
        <header-field label="Status">
          <span>{{ operation.processingStatus }}</span>
        </header-field>
        <header-field label="Created">
          <span>{{ formatDate(operation.createdDate) }}</span>
        </header-field>
        <header-field label="Processing Started">
          <span>{{ formatDate(operation.processingStartedDate) }}</span>
        </header-field>
        <header-field label="Processing Finished">
          <span>{{ formatDate(operation.processingEndedDate) }}</span>
        </header-field>
      </navigation-header-fields>
    </template>
    <template slot="right"></template>
  </navigation-header-panel>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import { IBatchOperation } from "sitewhere-rest-api";

import {
  HeaderComponent,
  ClipboardCopyField,
  NavigationHeaderPanel,
  NavigationHeaderFields,
  HeaderField
} from "sitewhere-ide-components";

import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    NavigationHeaderPanel,
    NavigationHeaderFields,
    HeaderField,
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
