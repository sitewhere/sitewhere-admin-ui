<template>
  <sw-list-entry>
    <v-container fluid @click="onAssetClicked">
      <v-layout row>
        <v-flex xs2>
          <branding-image :style="logoStyle" :entity="asset" />
        </v-flex>
        <v-flex xs10>
          <div>
            <div class="title ellipsis mb-1">{{ asset.name }}</div>
            <div>{{ asset.token }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </sw-list-entry>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import BrandingImage from "../common/BrandingImage.vue";

import { IStyle } from "../common/Style";
import { IAsset } from "sitewhere-rest-api";

@Component({
  components: {
    BrandingImage
  }
})
export default class AssetListEntry extends Vue {
  @Prop() readonly asset!: IAsset;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "80px",
      width: "80px",
      padding: "5px"
    };
  }

  // Handle asset clicked.
  onAssetClicked() {
    this.$emit("assetOpened", this.asset);
  }
}
</script>
