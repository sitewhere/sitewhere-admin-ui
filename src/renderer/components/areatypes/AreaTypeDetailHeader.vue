<template>
  <navigation-header-panel
    v-if="areaType"
    :icon="areaType.icon"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
    <span slot="content">
      <header-field label="Token">
        <clipboard-copy-field :field="areaType.token" message="Token copied to clipboard"></clipboard-copy-field>
      </header-field>
      <header-field label="Name">
        <span>{{ areaType.name }}</span>
      </header-field>
      <header-field label="Description">
        <span>{{ areaType.description }}</span>
      </header-field>
      <header-field label="Created">
        <span>{{ formatDate(areaType.createdDate) }}</span>
      </header-field>
      <header-field label="Updated">
        <span>{{ formatDate(areaType.updatedDate) }}</span>
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
import { IAreaType } from "sitewhere-rest-api";

export class AreaTypeHeaderComponent extends HeaderComponent<IAreaType> {}

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
  }
})
export default class AreaTypeDetailHeader extends Mixins(
  AreaTypeHeaderComponent
) {
  // Reference record as area type.
  get areaType(): IAreaType {
    return this.record;
  }

  // Token.
  get token(): string {
    return this.areaType ? this.areaType.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl() {
    return "areatypes/" + this.token + "/label/qrcode";
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>

<style scoped>
</style>
