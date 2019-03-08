<template>
  <navigation-header-panel
    v-if="area"
    :imageUrl="area.imageUrl"
    :qrCodeUrl="qrCodeUrl"
    height="200px"
  >
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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import NavigationHeaderPanel from "../common/NavigationHeaderPanel.vue";
import HeaderField from "../common/HeaderField.vue";
import LinkedHeaderField from "../common/LinkedHeaderField.vue";
import ClipboardCopyField from "../common/ClipboardCopyField.vue";

import { formatDate } from "../common/Utils";
import { IArea } from "sitewhere-rest-api/dist/model/areas-model";

@Component({
  components: {
    NavigationHeaderPanel,
    HeaderField,
    LinkedHeaderField,
    ClipboardCopyField
  }
})
export default class AreaDetailHeader extends Vue {
  @Prop() readonly area!: IArea;

  // Compute QR code URL.
  get qrCodeUrl() {
    return "areas/" + this.area.token + "/label/qrcode";
  }

  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>

<style scoped>
</style>
