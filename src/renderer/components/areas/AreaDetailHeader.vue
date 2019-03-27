<template>
  <navigation-header-panel v-if="area" :imageUrl="imageUrl" :qrCodeUrl="qrCodeUrl" height="200px">
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="area.token" message="Token copied to clipboard"></clipboard-copy-field>
      </header-field>
      <linked-header-field
        label="Area Type"
        :text="area.areaType.name"
        :url="'/areatypes/' + area.areaType.token"
      ></linked-header-field>
      <header-field label="Name">
        <span>{{ area.name }}</span>
      </header-field>
      <header-field label="Description">
        <span>{{ area.description }}</span>
      </header-field>
      <header-field label="Created">
        <span>{{ formatDate(area.createdDate) }}</span>
      </header-field>
      <header-field label="Updated">
        <span>{{ formatDate(area.updatedDate) }}</span>
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

import { formatDate } from "../common/Utils";
import { IArea } from "sitewhere-rest-api";

export class AreaHeaderComponent extends HeaderComponent<IArea> {}

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
  }
})
export default class AreaDetailHeader extends Mixins(AreaHeaderComponent) {
  // Reference record as area.
  get area(): IArea {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.area ? this.area.token : "";
  }

  // Get URL for image.
  get imageUrl(): string {
    return this.area ? this.area.imageUrl : "";
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

<style scoped>
</style>
