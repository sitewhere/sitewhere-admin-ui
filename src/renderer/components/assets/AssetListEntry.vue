<template>
  <v-card flat hover>
    <v-container fluid @click="onAssetClicked">
      <v-layout row>
        <v-flex xs2>
          <v-card-media>
            <div :style="logoStyle"></div>
          </v-card-media>
        </v-flex>
        <v-flex xs10>
          <div>
            <div class="title ellipsis mb-1">{{ asset.name }}</div>
            <div>{{ asset.token }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { IStyle } from "../common/Style";
import { IAsset } from "sitewhere-rest-api";

@Component({})
export default class AssetListEntry extends Vue {
  @Prop() readonly asset!: IAsset;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.asset.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%",
      border: "1px solid #eee",
      height: "60px",
      width: "60px"
    };
  }

  // Handle asset clicked.
  onAssetClicked() {
    this.$emit("assetOpened", this.asset);
  }
}
</script>

<style scoped>
</style>
