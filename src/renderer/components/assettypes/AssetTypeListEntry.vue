<template>
  <sw-list-entry>
    <v-container fluid @click="onAssetTypeClicked">
      <v-layout row>
        <v-flex xs3>
          <branding-image :style="logoStyle" :entity="assetType" />
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mb-1">{{ assetType.name }}</div>
            <div class="atdesc">{{ assetType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </sw-list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import BrandingImage from "../common/BrandingImage.vue";

import { IAssetType } from "sitewhere-rest-api";
import { IStyle } from "../common/Style";

@Component({
  components: {
    BrandingImage
  }
})
export default class AssetTypeListEntry extends Vue {
  @Prop() readonly assetType!: IAssetType;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "120px",
      width: "120px",
      "padding-left": "15px"
    };
  }

  // Callen when card is clicked.
  onAssetTypeClicked() {
    this.$emit("assetTypeOpened", this.assetType);
  }
}
</script>

<style scoped>
.atdesc {
  height: 80px;
  overflow-y: hidden;
}
</style>
